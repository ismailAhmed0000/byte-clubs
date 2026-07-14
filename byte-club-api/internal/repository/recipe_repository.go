package repository

import (
	"byte-club-api/internal/models"

	"gorm.io/gorm"
)


type RecipeRepository struct {
	DB *gorm.DB
}

func NewRecipeRepository (db *gorm.DB) *RecipeRepository{
	return &RecipeRepository{DB:db}
}

func (r *RecipeRepository) Create(recipe *models.Recipe) error {
	return r.DB.Create(recipe).Error
}

func (r *RecipeRepository) FindAllByUser(UserId uint)([]models.Recipe,error){
	var recipes []models.Recipe
	err := r.DB.Where("user_id = ?",UserId).Find(&recipes).Error
	return  recipes, err

}

func (r *RecipeRepository) FIndByIdAndUser(id string,userId uint)(*models.Recipe,error){
	var recipe models.Recipe
	err:= r.DB.Where("id=? AND user_id =?", id,userId).First(&recipe).Error
	if err !=nil{
		return nil, err
	}
	return  &recipe,nil
}

func (r *RecipeRepository) Delete(id string,userId uint)error{
	result := r.DB.Where("id=? AND userID=?",id,userId).Delete(&models.Recipe{})
	if result.Error != nil{
		return  result.Error
	}
	if result.RowsAffected== 0{
		return  gorm.ErrRecordNotFound
	}
	return nil
}

func (r *RecipeRepository) SetShareToken(id string, UseId uint, token string)error{
	result := r.DB.Model(&models.Recipe{}).Where("id=?, userId=?",id,UseId).Update("share_token",token)
	if result.Error !=nil{
		return result.Error
	}
	if result.RowsAffected ==0 {
		return gorm.ErrRecordNotFound
	}
	return  nil
}

func (r *RecipeRepository) FindByShareToken(token string)(*models.Recipe,error){
	var recipe models.Recipe
	err:= r.DB.Where("share_token=?",token).First(&recipe).Error
	if err !=nil{
		return  nil,err
	}
	return &recipe, nil
}