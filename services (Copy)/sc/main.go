package main

import (
	"encoding/json"
	"fmt"
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

	// Use the token to make a request to Microsoft Graph API
	graphResponse, err := getManagerInfo(requestBody.Token)
	if err != nil {
		http.Error(w, "Failed to get manager info", http.StatusInternalServerError)
		return
	}

	// Respond with the manager info
	response := struct {
		ManagerName string `json:"managerName"`
	}{
		ManagerName: graphResponse,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// profileHandler is a protected route that requires a token in the cookie
func profileHandler(w http.ResponseWriter, r *http.Request) {
	token, err := getTokenFromCookie(r)
	if err != nil {
		http.Error(w, "Unauthorized: No token provided", http.StatusUnauthorized)
		return
	}

	// Use the token to retrieve some protected information (e.g., profile details)
	managerInfo, err := getManagerInfo(token)
	if err != nil {
		http.Error(w, "Failed to get profile information", http.StatusInternalServerError)
		return
	}

	// Respond with the profile information
	w.Header().Set("Content-Type", "application/json")
	response := struct {
		Profile string `json:"profile"`
	}{
		Profile: fmt.Sprintf("Welcome! Your manager is: %s", managerInfo),
	}
	json.NewEncoder(w).Encode(response)
}

// getManagerInfo uses the token to request the manager info from Microsoft Graph API
func getManagerInfo(token string) (string, error) {
	req, err := http.NewRequest("GET", "https://graph.microsoft.com/v1.0/me/manager", nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+token)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result struct {
		DisplayName string `json:"displayName"`
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return "", err
	}

	fmt.Println("Your manager is:", result.DisplayName)

	return result.DisplayName, nil
}

func main() {
	fmt.Printf("Hello, man! Running version %s\n", version)

	// Start a goroutine with an HTTP server
	http.HandleFunc("/login", login)
	http.HandleFunc("/api/token", tokenHandler)
	http.HandleFunc("/profile", profileHandler) // Protected route

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, this is the homepage!")
	})

	http.ListenAndServe(":8080", nil)

}
