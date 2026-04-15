
const recipeDisplay = document.querySelector("#recipe-display");
const recipeTemplate = document.querySelector("#recipe-template");
const nutritionDisplay = document.querySelector("#nutrition-display");
const nutritionTemplate = document.querySelector("#nutrition-template");
const savedDisplay = document.querySelector("#saved-display");
const modal = document.querySelector("#modal");

let savedRecipes = JSON.parse(localStorage.getItem("saved") || "[]");

export async function getRecipe(food) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`
  const response = await fetch(url);
  const data = await response.json();

  return data.meals;
}

export function showAllRecipes(recipes) {
  recipeDisplay.replaceChildren();
  if (recipes === null) {
    const placeholder = document.createElement("h3");
    placeholder.textContent = "Sorry, no recipes found."
    recipeDisplay.append(placeholder);
  } else {
    recipes.forEach((recipe) => {
      console.log(recipe);
      createRecipeBox(recipe, recipeDisplay);
    });
  }
}

export function showSingleRecipe(recipes) {
  recipeDisplay.replaceChildren();
  // console.log(recipe);
  if (recipes === null) {
    const placeholder = document.createElement("h3");
    placeholder.textContent = "Sorry, no recipes found."
    recipeDisplay.append(placeholder);
  } else {
    const recipe = recipes[0];
    createRecipeBox(recipe, recipeDisplay);
  }
}

const createRecipeBox = (recipe, parent) => {
  const clone = recipeTemplate.content.cloneNode(true);
  const [title, img, ingredients, instructions, tags, youtube, btn] = clone.querySelectorAll("h3, img, ul, p, p, a, button");

  title.textContent = recipe.strMeal;
  img.src = recipe.strMealThumb;
  img.alt = recipe.strMeal;
  instructions.textContent = recipe.strInstructions;
  tags.textContent = recipe.strTags;
  if (recipe.strYoutube !== null) {
    youtube.href = recipe.strYoutube;
    youtube.textContent = 'Check it out on Youtube!'
  }

  for (let i = 1; i <= 20; i++) {
    let key1 = `strIngredient${i}`;
    let key2 = `strMeasure${i}`;
    let ingredient = recipe[key1];
    let measurement = recipe[key2];
    if (ingredient !== null && ingredient !== "") {
      let newIng = document.createElement("li");
      newIng.textContent = `${ingredient} - ${measurement}`;
      let ingBtn = document.createElement("button");
      ingBtn.textContent = "Nutrition Facts";
      ingBtn.value = ingredient;
      ingBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(ingBtn.value);
        modal.replaceChildren();
        getNutrition(ingBtn.value)
          .then(data => {
            console.log(data);
            createNutritionBox(data[0], modal);
            const closeBtn = document.createElement("button");
            closeBtn.textContent = "Close";
            closeBtn.addEventListener("click", () => {
              modal.close();
            });
            modal.append(closeBtn);
            modal.showModal();
          })
          .catch(err => console.error(err));
      })
      newIng.append(ingBtn);
      ingredients.append(newIng);
    }
  }
    
  if (document.querySelector(".main-recipe")) {
    btn.textContent = "Remove Recipe";
    btn.addEventListener("click", () => {
      const index = savedRecipes.findIndex(food => food.strMeal === recipe.strMeal);
      if (index !== -1) {
        savedRecipes.splice(index, 1);
        localStorage.setItem("saved", JSON.stringify(savedRecipes));
        getSavedRecipes();
      }
    });
  } else {
    btn.addEventListener("click", () => {
    
      savedRecipes.push(recipe);
      localStorage.setItem("saved", JSON.stringify(savedRecipes));

      if (document.querySelector(".main-home")) {
        getRecentRecipes();
      }
    });
  }

  parent.appendChild(clone);
}

// https://www.themealdb.com/api.php

// ====================================================================

export async function getNutrition(food) {
  const key = 'tYJ40KQPu2oXUSzOZ3vrUlaWpC4ReCxgWdYetf7D';
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${food}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.foods;
}

// https://fdc.nal.usda.gov/api-guide#bkmk-4

export function showNutrition(food) {
  nutritionDisplay.replaceChildren();
  console.log(food[0]);
  createNutritionBox(food[0], nutritionDisplay);
}

const createNutritionBox = (fact, parent) => {
  const clone = nutritionTemplate.content.cloneNode(true);
  const [name, nutrients, ingredients, serving] = clone.querySelectorAll("h3, ul, p, p");

  name.textContent = fact.description;
  if (fact.servingSize === undefined) {
    serving.textContent = `Serving Size not provided`;
  } else {
    let size = fact.servingSize.toFixed(2);
    serving.textContent = `Serving Size: ${size}${fact.servingSizeUnit}`;
  }
  fact.foodNutrients.forEach((nutrient) => {
    let newNutrient = document.createElement("li");
    if (nutrient.percentDailyValue === undefined) {
      newNutrient.textContent = `${nutrient.nutrientName} - Percent Daily Value not provided`
    } else {
      newNutrient.textContent = `${nutrient.nutrientName} - ${nutrient.percentDailyValue}% Daily Value`;
    }
    nutrients.append(newNutrient);
  });
  ingredients.textContent = fact.ingredients;
  parent.append(clone);
}

// =======================================================================



export function getRecentRecipes() {
  if (savedRecipes.length === 0) {
    const placeholder = document.createElement("h3");
    placeholder.textContent = "You haven't saved any recipes yet!"
    savedDisplay.append(placeholder);
  } else {
    savedDisplay.replaceChildren();
    let size = savedRecipes.length;
    for (let i = 0; i <= 2; i++) {
      if (savedRecipes[size - i] !== undefined) {
        createRecipeBox(savedRecipes[size-i], savedDisplay);
      }
    }
  }
}

export function getSavedRecipes() {
  savedDisplay.replaceChildren();
  if (savedRecipes.length === 0) {
    const placeholder = document.createElement("h3");
    placeholder.textContent = "You haven't saved any recipes yet!"
    savedDisplay.append(placeholder);
  } else {
    savedRecipes.forEach((recipe) => {
      createRecipeBox(recipe, savedDisplay);
    })
  }
}