package main

import (
	"com/bierbaum/todo-list-backend/controller"
	"com/bierbaum/todo-list-backend/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/items", new(controller.ToDoListController).GetToDoItems)
	r.POST("/items", new(controller.ToDoListController).AddToDoItem)
	r.PUT("/items/:uuid", new(controller.ToDoListController).UpdateToDoItem)
	r.DELETE("/items/:uuid", new(controller.ToDoListController).DeleteToDoItem)

	group := r.Group("/")
	group.Use(gin.Logger())
	group.Use(gin.Recovery())
	group.Use(middleware.AuthorizeJWT())

	r.Run() // listen and serve on 0.0.0.0:8080
}
