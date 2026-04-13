import { showSingleRecipe, getRecipe, getNutrition, showNutrition, getRecentRecipes } from './utils.mjs';



const recipeForm = document.querySelector("#recipe-form");
const recipeSearch = document.querySelector("#recipe-search");
const nutritionForm = document.querySelector("#nutrition-form");
const nutritionSearch = document.querySelector("#nutrition-search");

recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(recipeSearch.value);
  getRecipe(recipeSearch.value)
    .then(data => {
      // console.log(data[0]);
      showSingleRecipe(data[0]);
    })
    .catch(err => console.error(err));
});

nutritionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(nutritionSearch.value);
  getNutrition(nutritionSearch.value)
    .then(data => {
      // console.log(data);
      showNutrition(data);
    })
    .catch(err => console.error(err));
});

getRecentRecipes();