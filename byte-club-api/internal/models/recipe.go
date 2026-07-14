package models

import "gorm.io/gorm"

type Recipe struct{
	gorm.Model
	UserId string `json:"user_id"`
	SourceUrl string `json:"source_url"`
	Platform string `json:"platform"`
	Title string `json:"title"`
	Ingredients string `json:"ingredients"`
	ShareToken string `json:"share_token"`
}