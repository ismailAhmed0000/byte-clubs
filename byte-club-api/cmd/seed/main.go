package main

import (
	"byte-club-api/internal/config"
	"byte-club-api/internal/database"
	"byte-club-api/internal/models"
	"byte-club-api/internal/repository"
	"flag"
	"log"
)

func main() {
	email := flag.String("email", "", "email of the user to attach seed recipes to")
	flag.Parse()

	if *email == "" {
		log.Fatal("usage: go run ./cmd/seed -email you@example.com")
	}

	cfg := config.Load()
	db := database.Connect(cfg)

	userRepo := repository.NewUserRepository(db)
	user, err := userRepo.FindByEmail(*email)
	if err != nil {
		log.Fatalf("no user found with email %s: %v", *email, err)
	}

	recipeRepo := repository.NewRecipeRepository(db)

	seedRecipes := []models.Recipe{
		{
			UserId:       user.ID,
			SourceUrl:    "https://example.com/recipes/pasta",
			Platform:     "instagram",
			Title:        "Creamy Garlic Pasta",
			Ingredients:  "pasta, garlic, cream, parmesan, butter",
			Instructions: "Boil pasta. Saute garlic in butter. Add cream and parmesan. Toss with pasta.",
		},
		{
			UserId:       user.ID,
			SourceUrl:    "https://example.com/recipes/tacos",
			Platform:     "tiktok",
			Title:        "Crispy Fish Tacos",
			Ingredients:  "white fish, tortillas, cabbage, lime, chipotle mayo",
			Instructions: "Season and pan-fry fish. Warm tortillas. Assemble with slaw and sauce.",
		},
	}

	for _, r := range seedRecipes {
		if err := recipeRepo.Create(&r); err != nil {
			log.Fatalf("failed to seed recipe %s: %v", r.Title, err)
		}
		log.Printf("seeded recipe: %s", r.Title)
	}

	log.Println("done seeding")
}
