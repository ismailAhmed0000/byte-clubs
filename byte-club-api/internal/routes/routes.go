package routes

import (
	"byte-club-api/internal/handlers"
	"byte-club-api/internal/middleware"
	"byte-club-api/internal/repository"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)


func Setup(app *fiber.App, db *gorm.DB){
	userRepo := repository.NewUserRepository(db)
	authHandler := handlers.NewAuthHandler(userRepo)

	recipeRepo := repository.NewRecipeRepository(db)
	recipeHandler := handlers.NewRecipeHandler(recipeRepo)

	api := app.Group("/api")

	auth:= api.Group("/auth")
	auth.Post("/register",authHandler.Regeister)
	auth.Post("/login",authHandler.Login)

	recipes := api.Group("/recipes",middleware.Protected())
	recipes.Post("/",recipeHandler.Save)
	recipes.Post("/extract",recipeHandler.Extract)
	recipes.Get("/",recipeHandler.List)
	recipes.Get("/:id", recipeHandler.GetByID)
	recipes.Delete("/:id",recipeHandler.Delete)
	recipes.Post("/:id/share",recipeHandler.Share)
	

   public := api.Group("/public")
   public.Get("/recipe/:token",recipeHandler.GetPublicByToken)
	

}