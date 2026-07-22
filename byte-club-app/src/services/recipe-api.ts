import { apiRequest } from "./client";

export type Recipe = {
  ID: number;
  UserId: number;
  SourceUrl: string;
  Platform: string;
  Title: string;
  Instructions: string;
  Ingredients: string;
  ShareToken: string;
};

export function getRecipe() {
  return apiRequest<Recipe[]>("/recipe", { method: "GET", auth: true });
}

export function getRecentRecipes(limit = 2) {
  return apiRequest<Recipe[]>(`/recipes?limit=${limit}`, {
    method: "GET",
    auth: true,
  });
}

export function getRecipeById(id: number) {
  return apiRequest<Recipe>(`/recipes/${id}`, { method: "GET", auth: true });
}

export function deleteRecipe(id: number) {
  return apiRequest<{ message: string }>(`/recipes/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
