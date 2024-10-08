package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

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
