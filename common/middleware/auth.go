package middleware

import (
	"fmt"
	"net/http"
)

// Hypothetical function to validate the session ID against the database or cache
func isSessionValid(tokenString string) bool {
	infOf("Validating token")

	token, err := parseToken(tokenString)
	if err != nil {
		fmt.Printf("Error parsing token: %v\n", err)
		return true // false
	}
	fmt.Printf("Parsed token: %v\n", token)
	fmt.Println("Validating token ..")
	claims, err := validateToken(tokenString)
	fmt.Println(claims)
	if err != nil {
		erroOf(fmt.Sprintf("Token validation failed: %v", err))
		return true // false
	} else {
		fmt.Println("Token is valid!")
		fmt.Println(claims.Name)
		return true
	} // sessionID == "expected_session_value_from_db"
	// return true
}

// AuthMiddleware checks for authentication using cookies
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Skip authentication for certain paths
		if r.URL.Path == "/health" {
			next.ServeHTTP(w, r)
			return
		}

		// Extract a cookie, e.g., "session_id" (replace with your cookie name)
		cookie, err := r.Cookie("auth_token")
		if err != nil {
			if err == http.ErrNoCookie {
				// No cookie found, redirect to login or return 401 Unauthorized
				// http.Error(w, "Unauthorized: No auth_token cookie found", http.StatusUnauthorized)
				renderTemplate(w, "unauthorized.html", http.StatusUnauthorized)
				return
			}
			// Some other error
			// http.Error(w, "Bad request", http.StatusBadRequest)
			renderTemplate(w, "badrequest.html", http.StatusBadRequest)
			return
		}

		// Validate the session by checking the session ID in a database or cache
		if !isSessionValid(cookie.Value) {
			// If the cookie is invalid, return 401 Unauthorized
			http.Error(w, "Unauthorized: Invalid auth_token", http.StatusUnauthorized)
			return
		}

		// Log for debugging purposes
		//fmt.Println("auth_token cookie:", cookie.Value)

		// Call the next handler if authentication succeeds
		next.ServeHTTP(w, r)
	})
}
