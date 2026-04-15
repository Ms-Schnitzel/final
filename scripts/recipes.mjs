import { getSavedRecipes } from './utils.mjs';

let savedRecipes = JSON.parse(localStorage.getItem("saved") || "[]");
getSavedRecipes();
// let recipeCards = document.querySelectorAll(".recipe-card");

// function setRemoveBtn() {
//   // console.log(recipeCards);
//   recipeCards.forEach((recipe) => {
//     // console.log(recipe);
//     // recipe.lastElementChild.remove();
//     const saveBtn = recipe.querySelector("button");
//     if (saveBtn) saveBtn.remove();
//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "Remove Recipe from Favorites";
//     removeBtn.addEventListener("click", () => {
//       let name = recipe.querySelector("h3").textContent;
//       const index = savedRecipes.findIndex(food => food.strMeal === name);
//       if (index !== -1) {
//         savedRecipes.splice(index, 1);
//         localStorage.setItem("saved", JSON.stringify(savedRecipes));
//         updateRecipes();
//       }
//     });
//     recipe.append(removeBtn);
//   });
// }

// function updateRecipes() {
//   getSavedRecipes();
//   recipeCards = document.querySelectorAll(".recipe-card");
//   setRemoveBtn();
// }

// updateRecipes();