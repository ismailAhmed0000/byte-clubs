package handlers

import (
	"byte-club-api/internal/models"
	"byte-club-api/internal/repository"

	"github.com/gofiber/fiber/v2"
)

type RecipeHandler struct{
	RecipeRepo *repository.RecipeRepository
}

func NewRecipeHandler( repo *repository.RecipeRepository) *RecipeHandler{
	return &RecipeHandler{RecipeRepo:repo}
}

type SaveRecipeRequest struct {
	SourceUrl    string `json:"source_url"`
	Platform     string `json:"platform"`
	Title        string `json:"title"`
	Ingredients  string `json:"ingredients"`
	Instructions string `json:"instructions"`

}

func (h *RecipeHandler) Save(c *fiber.Ctx) error {
	user_id := c.Locals("user_id").(uint)

	var req SaveRecipeRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid request body"})
	}

	recipe := models.Recipe{
		UserId:       user_id,
		SourceUrl:    req.SourceUrl,
		Platform:     req.Platform,
		Title:        req.Title,
		Ingredients:  req.Ingredients,
		Instructions: req.Instructions,
	}

	if err := h.RecipeRepo.Create(&recipe); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "could not save recipe"})
	}

	return c.Status(fiber.StatusCreated).JSON(recipe)
}