// This file ONLY fetches data. It knows nothing about the UI.
const RECIPES_URL = process.env.PUBLIC_URL + "/data/recipes.json";

export async function loadRecipes() {
  const response = await fetch(RECIPES_URL);

  if (!response.ok) {
    throw new Error("Could not load recipes (server status " + response.status + ").");
  }

  const data = await response.json();

  if (!Array.isArray(data.recipes)) {
    throw new Error("The recipes file has an unexpected format.");
  }
  return data.recipes;
}