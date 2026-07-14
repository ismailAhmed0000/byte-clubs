package database

import (
	"byte-club-api/internal/config"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(cfg *config.Config) *gorm.DB{
	dsn:= fmt.Sprintf(
		"host=%s port=%s user=%s password='%s' dbname=%s sslmode=%s",
		cfg.DBHost,cfg.DBPort,cfg.DBUser,cfg.DBPassword,cfg.DBName,cfg.DBSSLMode,

	)

	db, err:= gorm.Open(postgres.Open(dsn),&gorm.Config{})
	if err!= nil{
		log.Fatalf("failed to connect to db %v",err)
	}

	log.Println("Database connected successfully")
	return  db
}