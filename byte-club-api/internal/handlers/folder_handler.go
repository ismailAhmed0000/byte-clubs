package handlers

import (
	"byte-club-api/internal/models"
	"byte-club-api/internal/repository"

	"github.com/gofiber/fiber/v2"
)

type FolderHandler struct {
	FolderRepo *repository.FolderRepository
}

func NewFolderHandler(repo *repository.FolderRepository) *FolderHandler{
	return  &FolderHandler{FolderRepo :repo}
}

type CreateFolderRequest struct {
	Name string `json:"name"`
}

func (h *FolderHandler) Create (c *fiber.Ctx)error{
	userId := c.Locals("user_id").(uint)

	var req CreateFolderRequest
	if err:= c.BodyParser(&req); err !=nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message":"invalid request"})
	}
	if req.Name ==""{
		return  c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message":"Name missing"})
	}

	folder := models.Folder{UserId:userId, Name :req.Name}
	if err:= h.FolderRepo.Create(&folder);err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message":"could not create folder"})

	}
	return c.Status(fiber.StatusCreated).JSON(folder)

}

func (h *FolderHandler) List (c *fiber.Ctx) error{
	userId := c.Locals("user_id").(uint)

	folders , err:= h.FolderRepo.FindAll(userId)
	if err !=nil{
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "could not fetch folders"})
	}
	return  c.JSON(folders)
}

func (h *FolderHandler)Delete(c *fiber.Ctx)error{
	userId := c.Locals("user_id").(uint)

	id :=c.Params("id")

	if err:= h.FolderRepo.Delete(id,userId); err !=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "folder not found"})
	}
	return c.JSON(fiber.Map{"message":"folder deleted successfully"})
}