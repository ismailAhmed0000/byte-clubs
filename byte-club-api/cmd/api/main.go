package main

import (
	"byte-club-api/internal/config"
	"byte-club-api/internal/database"
	"byte-club-api/internal/models"
	"byte-club-api/internal/routes"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {

	cfg := config.Load()
	db:=database.Connect(cfg)
	
	if err:= db.AutoMigrate(&models.User{}, &models.Recipe{});err !=nil{
		log.Fatalf("failed to migrate to database: %v",err)
	}

	app :=fiber.New()

	routes.Setup(app,db)

	log.Fatal(app.Listen(":" + cfg.Port))
}

