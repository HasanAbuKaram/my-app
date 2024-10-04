package main

import (
	"encoding/json"
	"io"
	"net/http"
	"time"
)

// setTokenCookie sets a cookie for the token
func setTokenCookie(w http.ResponseWriter, token string) {
	http.SetCookie(w, &http.Cookie{
		Name:     "auth_token",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Secure:   true,
		Path:     "/",
	})
}

// getTokenFromCookie retrieves the token from the cookie
func getTokenFromCookie(r *http.Request) (string, error) {
	cookie, err := r.Cookie("auth_token")
	if err != nil {
		return "", err
	}
	return cookie.Value, nil
}

// tokenHandler handles the token received from the frontend
func tokenHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Parse the request body
	var requestBody struct {
		Token string `json:"token"`
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &requestBody)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Set the token as a cookie
	setTokenCookie(w, requestBody.Token)

	// Redirect to another page, e.g., /PR after setting the cookie
	// http.Redirect(w, r, "/", http.StatusSeeOther)
	w.Header().Set("Content-Type", "application/json")
	jsonResponse := map[string]string{"message": "Token received successfully"}
	json.NewEncoder(w).Encode(jsonResponse)
}
