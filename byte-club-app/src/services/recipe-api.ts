import { apiRequest } from "./client";

export type Recipe = {
  ID: number;
  userId: number;
  sourceUrl: string;
  platform: string;
  title: string;
  instructions: string;
  ingredients: string;
  shareToken: string;
};

export function getRecipe() {
  return apiRequest<Recipe[]>("/recipes", { method: "GET", auth: true });
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

export function extractRecipe(url: string) {
  return apiRequest<Recipe>("/recipes/extract", {
    method: "POST",
    body: { url },
    auth: true,
  });
}
