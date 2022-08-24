const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');
const centr = document.querySelector(".text__center");

var colors = ["#BD3120", "#E1D5B1", "#DE9538", "#E8603A"];

get_meal_btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        })
    centr.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
});

const createMeal = (meal) => {
    const ingredients = [];
    for(i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    const newInnerHTML = `
        <div class="row">
            <div class="column_1">  
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="Meal img"/>
            </div>
        </div>
        <div class="row row_2">
            <div class="column_2">
                <div class="res">
                    ${meal.strCategory ? `<h3>Category:<p>${meal.strCategory}</p></h3>` : ''}
                    ${meal.strArea ? `<h3>Area:<p>${meal.strArea}</p></h3>` : ''}
                    ${meal.strTags ? `<h3>Tags:<p>${meal.strTags.split(',').join(', ')}</p></h3>` : ''}
                </div>
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredients.map(ingredient => `
                        <li>${ingredient}</li>
                    `).join('')}
                </ul>
            </div>
            <div class="column_3">
                <p>${meal.strInstructions}</p>
                ${meal.strYoutube ? `
                <h4><strong>Video Recipe</strong></h4>
                <div class="videoWrapper">
                    <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                    </iframe>
                </div>` : ''}
            </div>
        </div>
	`;
	
	meal_container.innerHTML = newInnerHTML;
}