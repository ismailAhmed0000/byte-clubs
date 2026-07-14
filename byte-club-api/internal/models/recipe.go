package models

import "gorm.io/gorm"

type Recipe struct{
	gorm.Model
	UserId  uint `json:"user_id"`
	SourceUrl string `json:"source_url"`
	Platform string `json:"platform"`
	Title string `json:"title"`
	Instructions string `json:"instructions"`
	Ingredients string `json:"ingredients"`
	ShareToken string `json:"share_token"`
}