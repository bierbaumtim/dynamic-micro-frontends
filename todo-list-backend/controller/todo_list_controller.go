package controller

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type ToDoListController struct{}

type ToDoItem struct {
	ID        primitive.ObjectID `json:"id" bson:"_id"`
	Title     string             `json:"title" bson:"title"`
	Content   string             `json:"content" bson:"content"`
	Completed bool               `json:"completed" bson:"completed"`
}

func (controller *ToDoListController) GetToDoItems(c *gin.Context) {
	userId := c.GetString("userid")

	var err error

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	client, cErr := initiateMongoClient(ctx)
	if cErr != nil {
		log.Fatal(cErr)
		c.JSON(http.StatusInternalServerError, "Database not available")
		return
	}

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, "Could connect to database(ping)")
		return
	}

	collection := client.Database(userId).Collection("todo_items")

	cursor, findErr := collection.Find(ctx, bson.D{{}})
	if findErr != nil {
		log.Fatal(findErr)
		c.JSON(http.StatusInternalServerError, "Unexpected error while collecting todo items")
		return
	}

	var items []map[string]interface{}

	err = cursor.All(ctx, &items)
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, "Unexpected error while collecting todo items")
		return
	}

	c.JSON(http.StatusOK, items)
}

func (controller *ToDoListController) AddToDoItem(c *gin.Context) {
	userId := c.GetString("userid")

	var err error

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	client, cErr := initiateMongoClient(ctx)
	if cErr != nil {
		log.Fatal(cErr)
		c.JSON(http.StatusInternalServerError, "Database not available")
		return
	}

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, "Could connect to database(ping)")
		return
	}

	var item ToDoItem

	err = c.ShouldBindJSON(&item)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Body does not conform to todo item type")
		return
	}

	collection := client.Database(userId).Collection("todo_items")

	insertRes, insertErr := collection.InsertOne(ctx, item)
	if insertErr != nil {
		c.JSON(http.StatusInternalServerError, "Error while adding todo item")
		return
	}

	itemId, ok := insertRes.InsertedID.(primitive.ObjectID)
	if ok {
		item.ID = itemId
		c.JSON(http.StatusOK, item)
		return
	}

	c.JSON(http.StatusOK, "")
}

func (controller *ToDoListController) UpdateToDoItem(c *gin.Context) {
	userId := c.GetString("userid")

	var err error

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	client, cErr := initiateMongoClient(ctx)
	if cErr != nil {
		log.Fatal(cErr)
		c.JSON(http.StatusInternalServerError, "Database not available")
		return
	}

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, "Could connect to database(ping)")
		return
	}

	var item ToDoItem

	err = c.ShouldBindJSON(&item)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Body does not conform to todo item type")
		return
	}

	collection := client.Database(userId).Collection("todo_items")

	_, err = collection.UpdateByID(ctx, item.ID, item, nil)
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, "Failed to update item")
		return
	}

	c.JSON(http.StatusOK, "")
}

func (controller *ToDoListController) DeleteToDoItem(c *gin.Context) {
	userId := c.GetString("userid")

	var err error

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	client, cErr := initiateMongoClient(ctx)
	if cErr != nil {
		log.Fatal(cErr)
		c.JSON(http.StatusInternalServerError, "Database not available")
		return
	}

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, "Could connect to database(ping)")
		return
	}

	var item ToDoItem

	err = c.ShouldBindJSON(&item)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Body does not conform to todo item type")
		return
	}

	collection := client.Database(userId).Collection("todo_items")

	filter := bson.D{{"_id", item.ID}}

	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, "Failed to delete item")
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusOK, "Item was already deleted")
		return
	}

	c.JSON(http.StatusOK, "Item successfully deleted")
}

func initiateMongoClient(ctx context.Context) (*mongo.Client, error) {
	url := os.Getenv("DB_CONNECTION_STRING")
	opts := options.Client()
	opts.ApplyURI(url)
	opts.SetMaxPoolSize(5)

	return mongo.Connect(ctx, opts)
}
