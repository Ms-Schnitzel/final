import { getSavedRecipes } from './utils.mjs';

let savedRecipes = JSON.parse(localStorage.getItem("saved") || "[]");
getSavedRecipes();