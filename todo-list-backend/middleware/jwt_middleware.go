package middleware

import (
	"com/bierbaum/todo-list-backend/helper"

	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthorizeJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		tokenString := authHeader[len("Bearer"):]
		token, err := helper.ValidateToken(tokenString)

		if err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
		} else if token.Valid {
			userId, err := helper.ExtractUserId(token)

			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, "Provided token does not contain required user id")
			} else {
				c.Set("userid", userId)
				c.Next()
			}
		} else {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
	}
}
