package helper

import (
	"errors"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func ValidateToken(encodedToken string) (*jwt.Token, error) {
	return jwt.Parse(encodedToken, func(token *jwt.Token) (interface{}, error) {
		if _, isValid := token.Method.(*jwt.SigningMethodHMAC); !isValid {
			return nil, errors.New("invalid token")
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})
}

func ExtractUserId(token *jwt.Token) (string, error) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("unauthorized")
	}

	userId, userOk := claims["iss"].(string)

	if !userOk {
		return "", errors.New("unauthorized")
	}

	return userId, nil
}