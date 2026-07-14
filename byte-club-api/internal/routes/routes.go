package routes

import (
	"byte-club-api/internal/handlers"
	"byte-club-api/internal/repository"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)


func Setup(app *fiber.App, db *gorm.DB){
	userRepo := repository.NewUserRepository(db)
	authHandler := handlers.NewAuthHandler(userRepo)

	api := app.Group("/api")
	auth:= api.Group("/Auth")

	auth.Post("/register",authHandler.Regeister)
	auth.Post("/login",authHandler.Login)
}