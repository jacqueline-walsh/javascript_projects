// https://www.themealdb.com/api.php

const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('results-heading'),
    single_mealEl = document.getElementById('single-meal');
    
// FUNCTION

// search meal and fetch from api
function searchMeals(e) {
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = '';

    // Get the search term
    const term = search.value;
    
    // Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
          .then(res => res.json())
          .then(data => {
            resultHeading.innerHTML = `<h2>Search results for: ${term}</h2>`;

            if (data.meals === null) {
                resultHeading.innerHTML = `<h2>There are no search results for: ${term}</h2>`;
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealId="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`).join('');
            }
            });
            // Clear Search Text
            search.value = '';
    } else {
        alert('Please enter a search term');
    }
}

// fetch meal by ID function
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
    });
}

// Fetch random meal from api
function getRandomMeal() {
    // clear headings and meals
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}    


// Add meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}` );
        } else {
            break;
        }
    }
    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
                </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `
}

// EVENT LISTENERS
submit.addEventListener('submit', searchMeals);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
});
