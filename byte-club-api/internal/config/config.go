package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)


type Config struct {
	Port string
	DBHost string
	DBPort string
	DBUser string
	DBPassword string
	DBName string
	DBSSLMode string
}

func Load() *Config{
	 if err:= godotenv.Load();err !=nil{
		log.Println("no .env file found")
	 }

	 port := os.Getenv("PORT")
	 if port == "" {
		port = "3002"
	 }

	 return &Config{
		Port: port,
		DBHost: os.Getenv("DB_HOST"),
		DBPort: os.Getenv("DB_PORT"),
		DBUser:     os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBName:     os.Getenv("DB_NAME"),
		DBSSLMode:  os.Getenv("DB_SSLMODE"),
	  }
}