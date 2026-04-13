import { getSavedRecipes } from './utils.mjs';

let savedRecipes = JSON.parse(localStorage.getItem("saved") || "[]");

const recipeCards = document.querySelectorAll(".recipe-card");

function setRemoveBtn() {
  console.log(recipeCards);
  recipeCards.forEach((recipe) => {
    console.log(recipe);
    recipe.lastElementChild.remove();
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Recipe from Favorites";
    removeBtn.addEventListener("click", (e) => {
      let name = recipe.firstElementChild.textContent;
      const index = savedRecipes.findIndex(food => food.strMeal === name);
      savedRecipes.splice(index, 1);
      localStorage.setItem("saved", JSON.stringify(savedRecipes));
      location.reload();
    });
    recipe.append(removeBtn);
  });
}

getSavedRecipes();
setRemoveBtn();