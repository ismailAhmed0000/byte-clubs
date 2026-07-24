package repository

import (
	"byte-club-api/internal/models"

	"gorm.io/gorm"
)

type FolderRepository struct {
	DB *gorm.DB
}

func NewFolderRepository(db *gorm.DB) *FolderRepository {
	return &FolderRepository{DB: db}
}

func (r *FolderRepository) Create(folder *models.Folder) error{
	return r.DB.Create(folder).Error
}

func (r *FolderRepository) FindAll (userId uint)([]models.Folder, error){
	var folders []models.Folder
	err := r.DB.Where("user_id = ?",userId).Order("created_at desc").Find(&folders).Error
	return  folders, err
}

func (r *FolderRepository) FindByIdandUser(userId uint, id string)(*models.Folder,error){
	var folder models.Folder
	err := r.DB.Where("id=? AND user_id=?",id,userId).First(&folder).Error
	if err !=nil{
		return  nil,err
	}
	return  &folder,nil
}

func (r *FolderRepository) Delete (id string, userId uint)error{

	result := r.DB.Where("id=? AND user_id=?", id,userId).Delete(&models.Folder{})
	if result.Error != nil{
		return result.Error
	}
	if result.RowsAffected ==0 {
		return  gorm.ErrRecordNotFound
	}
	return nil

}