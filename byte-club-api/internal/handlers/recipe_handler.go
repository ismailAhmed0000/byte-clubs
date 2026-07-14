package handlers

import (
	"byte-club-api/internal/models"
	"byte-club-api/internal/repository"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
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

func (h *RecipeHandler)List(c *fiber.Ctx)error{
	userId := c.Locals("user_id").(uint)

	recipes, err := h.RecipeRepo.FindAllByUser(userId)
	if err != nil{
		return  c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"could not fetch recipes"})
	}
	return c.JSON(recipes)
}


func (h *RecipeHandler) GetByID (c *fiber.Ctx)error{
	userId := c.Locals("user_id").(uint)
	id:= c.Params("id")

	recipe , err := h.RecipeRepo.FIndByIdAndUser(id,userId)
	if err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"recipe not found"})
	}
	return  c.JSON(recipe)

}

func (h *RecipeHandler)Delete(c *fiber.Ctx)error{
	userId := c.Locals("user_id").(uint)
	id := c.Params("id")

	if err:= h.RecipeRepo.Delete(id,userId); err != nil{
		return  c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Recipe not found"})
	}
	return  c.JSON(fiber.Map{"message":"recipe deletecd successfully"})
	
}

func (h *RecipeHandler) Share (c *fiber.Ctx) error{
	userId := c.Locals("user_id").(uint)
	id:= c.Params("id")
	token := uuid.NewString()

	if err := h.RecipeRepo.SetShareToken(id, userId, token); err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "recipe not found"})
	}

	return c.JSON(fiber.Map{"share_url":"api/public/recipes"+token})
	
}