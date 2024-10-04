package main

import (
	"fmt"
	"net/http"
	"time"
)

// logoutHandler clears the auth token cookie and redirects to the login page
func logoutHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Log out")
	// Clear the auth token cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "auth_token",                   // Name of the cookie to delete
		Value:    "",                             // Set the cookie value to an empty string
		Expires:  time.Now().Add(-1 * time.Hour), // Set the expiration time to the past
		Path:     "/",                            // Path where the cookie is valid
		Secure:   true,                           // Use secure cookies (only sent over HTTPS)
		HttpOnly: true,                           // Prevent JavaScript access to the cookie
		// SameSite: http.SameSiteLax,               // Use SameSite attribute to prevent CSRF attacks
	})

	// Optionally clear other cookies if necessary
	// http.SetCookie(w, &http.Cookie{Name: "another_cookie", Value: "", Expires: time.Now().Add(-1 * time.Hour), Path: "/"})

	// Redirect to the login page or any other page after logout
	http.Redirect(w, r, "/", http.StatusSeeOther) // Redirect to login page
}
