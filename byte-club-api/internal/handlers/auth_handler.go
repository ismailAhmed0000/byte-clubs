package handlers

import (
	"byte-club-api/internal/models"
	"byte-club-api/internal/repository"
	"byte-club-api/pkg/utlils"
	"log"

	"github.com/gofiber/fiber/v2"
)


type AuthHandler struct {
	userRepo *repository.UserRepository
}

func NewAuthHandler(repo *repository.UserRepository) *AuthHandler{
	return &AuthHandler{userRepo: repo}

}
 type RegisterRequest struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
 }

 func (h *AuthHandler) Regeister(c *fiber.Ctx) error {
	var req RegisterRequest
	if err:= c.BodyParser(&req);err !=nil {
		return  c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "email and password are required"})
	}

	if req.Email =="" || req.Password ==""{
		return  c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	hashedPassowrd, err := utlils.HashPassword(req.Password)
	if err != nil {
		return  c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"could not hash the password"})
	}

	user := models.User{
		Name: req.Name,
		Email: req.Email,
		Password: hashedPassowrd,
	}

	if err := h.userRepo.Create(&user);err != nil{
		log.Println("create user errpr",err)
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error":"User already exsist or invalid data"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":"User registered successfully",
		"user": fiber.Map{"id":user.ID, "name":user.Name, "email":user.Email},
	})
}

type LoginRequest struct{
	Email string `json:"email"`
	Password string `json:"password"`
}

func (h *AuthHandler) Login(c*fiber.Ctx) error{
	var req LoginRequest
	if err:= c.BodyParser(&req); err !=nil{
		return  c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	user, err:= h.userRepo.FindByEmail(req.Email)
	if err !=nil{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid credentials"})
	}

	if !utlils.CheckPassword(user.Password, req.Password){
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Incorrect Password"})
	}

	token, err:= utlils.GenerateJWT(user.ID)
	if err!=nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"could not generate token"})
	}

	return c.JSON(fiber.Map{
		"message":"Login Successfull",
		"token":token,
	})
}