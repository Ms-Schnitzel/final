
async function getRecipe(food) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`
  const response = await fetch(url);
  const data = await response.json();

  return data.meals;
}

// https://www.themealdb.com/api.php

getRecipe("rice")
  .then(data => console.log(data))
  .catch(err => console.error(err));


async function getNutrition(food) {
  const key = 'tYJ40KQPu2oXUSzOZ3vrUlaWpC4ReCxgWdYetf7D';
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${food}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.foods;
}

// https://fdc.nal.usda.gov/api-guide#bkmk-4

getNutrition("cheese")
  .then(data => console.log(data))
  .catch(err => console.error(err));