package models

import "gorm.io/gorm"


type Folder struct {
	gorm.Model
	UserId uint `json:"user_id"`
	Name string `json:"name"`
}