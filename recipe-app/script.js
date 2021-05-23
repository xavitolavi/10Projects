const mealsEl = document.getElementById('meals');
const favMeals = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const mealPopupCloseBtn = document.getElementById('close-popup');
const mealRecipeEl = document.getElementById('meal-recipe');


getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const responseData = await response.json();
    const randomMeal = responseData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
    const responseData = await resp.json();
    const meals = responseData.meals;

    return meals;
} 

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random recipe</span>` : ''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
        `;
    const favBtn = meal.querySelector(".meal-body .fav-btn");

    favBtn.addEventListener("click", () => {
        if (favBtn.classList.contains("active")){
            removeMealFromLocal(mealData.idMeal);
            favBtn.classList.remove("active");
        } else {
            addMealToLocal(mealData.idMeal);
            favBtn.classList.toggle("active");
        }

        fetchFavMeals();
    })
    
    meal.querySelector('img').addEventListener('click', () => {
        showMealInfo(mealData);
    });

    meals.appendChild(meal);
}


function addMealToLocal(mealId) {
    const mealIds = getMealsFromLocal();

    localStorage.setItem('mealIds',JSON.stringify([...mealIds, mealId]));

}

function removeMealFromLocal(mealId) {
    const mealIds = getMealsFromLocal();

    localStorage.setItem('mealIds',JSON.stringify(mealIds.filter((id) => id !== mealId)));

}

function getMealsFromLocal() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    //Clean container to avoid duplication
    favMeals.innerHTML = '';
    const mealIds = getMealsFromLocal();
    const meals = [];

    for (let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        let meal = await getMealById(mealId);
        addMealToFav(meal);
    }

    console.log(meals);
}

function addMealToFav(mealData) {
    const favMeal = document.createElement('li');

    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-times-circle"></i></button>`;

    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
        removeMealFromLocal(mealData.idMeal);
        fetchFavMeals();
    });

    favMeal.querySelector('img').addEventListener('click', () => {
        showMealInfo(mealData);
    });

    favMeals.appendChild(favMeal);
}

searchBtn.addEventListener('click', async () => {
    //clean container for every search
    mealsEl.innerHTML = '';
    const search = searchTerm.value; 
    const meals = await getMealsBySearch(search);

    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

mealPopupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});

function showMealInfo(mealData) {
    //clean up
    mealRecipeEl.innerHTML = '';
    //update meal info
    const mealEl = document.createElement('div');

    //get ingredients and measures
    const ingredients = [];

    for (let i=1; i<20; i++) {
        if (mealData['strIngredient'+i]) {
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strIngredient'+i]}`)
        }
        else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>
            ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    `;

    mealRecipeEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
}