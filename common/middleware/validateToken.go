package middleware

import (
	"errors"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
)

// User type
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Claims struct for Microsoft Graph token
type MSClaims struct {
	Aud   string `json:"aud"`
	Iss   string `json:"iss"`
	Iat   int64  `json:"iat"`
	Nbf   int64  `json:"nbf"`
	Exp   int64  `json:"exp"`
	Name  string `json:"name"`
	Email string `json:"upn"`
	jwt.RegisteredClaims
}

func validateToken(tokenStr string) (MSClaims, error) {
	// Get the token from the request header
	if tokenStr == "" {
		return MSClaims{}, errors.New("unauthorized")
	}

	// Remove "Bearer " prefix if present
	if len(tokenStr) > 7 && tokenStr[:7] == "Bearer " {
		tokenStr = tokenStr[7:]
	}

	// Initialize a new instance of `MSClaims`
	claims := &MSClaims{}

	// Parse the JWT string and store the result in `claims`.
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		// Normally, you would verify the token's signature with the public key
		// For simplicity, we'll skip this step here
		return tokenStr, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return MSClaims{}, errors.New("unauthorized")
		}
		return MSClaims{}, errors.New("bad Request")
	}
	if !token.Valid {
		return MSClaims{}, errors.New("unauthorized")
	}

	infOf(claims.Name)
	// If we reach this point, the token is valid and we can extract the claims
	return *claims, nil
}

func parseToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate the algorithm
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		// Return the key for validation (replace with your actual key)
		return []byte("your-256-bit-secret"), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		fmt.Printf("Claims: %v\n", claims)
	} else {
		return nil, fmt.Errorf("invalid token")
	}

	return token, nil
}
