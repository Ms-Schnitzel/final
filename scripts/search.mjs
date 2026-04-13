import { showAllRecipes, getRecipe } from './utils.mjs';

const recipeForm = document.querySelector("#recipe-form");
const recipeSearch = document.querySelector("#recipe-search");

recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(recipeSearch.value);
  getRecipe(recipeSearch.value)
    .then(data => {
      // console.log(data);
      showAllRecipes(data);
    })
    .catch(err => console.error(err));
});