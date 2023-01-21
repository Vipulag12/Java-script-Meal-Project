let btn_generate = document.querySelector("#sub");
let API_KEY = "746b258a0e9545b39106766b99414914";
let height = document.querySelector("#height");
let weight = document.querySelector("#weight");
let age = document.querySelector("#age");
let gender = document.querySelector("#gender");
let Activity = document.querySelector("#Activity");
let display = document.querySelector("#display");
let recipe_detail = document.querySelector("#recipe_detail");
let ingredients_detail = document.querySelector("#ingredients_detail");
document.getElementById("recipi-container").style.display = "none";

let bmr;

const showData = () => {
  if (gender.value === "female") {
    bmr =
      655.1 + 9.563 * weight.value + 1.85 * height.value - 4.676 * age.value;
  } else if (gender.value === "male") {
    bmr =
      66.47 + 13.75 * weight.value + 5.003 * height.value - 6.755 * age.value;
  }

  if (Activity.value === "light") {
    bmr = bmr * 1.375;
  } else if (Activity.value === "moderate") {
    bmr = bmr * 1.55;
  } else if (Activity.value === "high") {
    bmr = bmr * 1.725;
  }

  if (height.value == "" || weight.value == "" || age.value == "") {
    alert("Please fill the detail.");
    return;
  }
  generate_meal_cart(bmr);
};




async function get_recipe(id) {
  let information = "";
  let ingredients = "";
  let url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`;
  let res;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res = data;
    });

 document.getElementById("recipi-container").style.display = "flex";
  res.analyzedInstructions[0].steps.map((eve) => {
    console.log(eve);
    information += `
      <li>${eve.step}</li>

    `;
    recipe_detail.innerHTML = information;
  });
  res.extendedIngredients.map((eve) => {
    console.log(eve);
    ingredients += `

      <p>${eve.name}</p>

    `;
    ingredients_detail.innerHTML = ingredients;
  });
}

async function generate_meal_cart(bmr) {
  let result;
  let html = "";
  await fetch(
    `https://api.spoonacular.com//mealplanner/generate?timeFrame=day&targetCalories=${bmr}&apiKey=${API_KEY}&includeNutrition=true`
  )
    .then((res) => res.json())
    .then((data) => {
      result = data;
    });

  result.meals.map(async (p) => {
    let url = `https://api.spoonacular.com/recipes/${p.id}/information?apiKey=${API_KEY}&includeNutrition=false`;
    let imgURL;
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        imgURL = data.image;
      });

    html += `
          <div class=meals>
            <div class="card">
                <div class="image">
                    <img src=${imgURL} alt="Breakfast">
                </div>
                <div class="details">
                    <h4>${p.title}</h4>
                    <h5> Calories: ${bmr.toFixed(2)}</h5>
                    <h5>preparation time ${p.readyInMinutes} minutes</h5>
                    <button id="recipe" onclick="get_recipe(${p.id})">Get Recipe</button>
                </div>
            </div>

           
        </div>
          `;
    display.innerHTML = html;
  });
}
btn_generate.addEventListener("click", showData);











// let btn = document.getElementById("btn");
// let food = document.getElementById("foods");
// let ingrediants = document.getElementById("ingrediants");


// async function FoodApi() { 

//         const url = "https://api.spoonacular.com/mealplanner/generate?apiKey=a20d05ab59fd48c19c646093dafc749b&timeFrame=day=";
//     const response= await fetch(url);
//     const res = await response.json();
//     console.log(res);
//     // let num = res.nutrients;
//     //     // for (const element in res) 
//     // generateHTML(res.meals, num);
       
//     // function generateHTML(value,num){
//     //     let ans = "";
//     //     value.map((value)=>{
//     //         ans +=
//     //         `<div><h4>${value.title}</h4>
//     //         <p>${value.servings}</p>
//     //         <p><a href="${value.sourceUrl}">Recipe</a></p>
//     //         <p>${num.calories}</p>
//     //         </div>
//     //         ` })

//     // document.getElementById('foods').innerHTML = ans;
//     // }  
//     return res;
// }

// function bgmFunction(){
//     let gender  = document.getElementById('gender').value;
//     let height = document.getElementById("height").value;
//     let weight = document.getElementById("weight").value;
//     var age = document.getElementById("age").value;
//     var activity = document.getElementById("activity").value;
//     let calories;
//     // let bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
// var bmr;

// //male

// if(gender=="male"  ){
//      bmr =66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
//      bmr.toFixed(2);
//     console.log(bmr.toFixed(2));

//     //female
// }if(gender=="female"){
//     bmr =655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
//     bmr.toFixed(2);
//     console.log(bmr.toFixed(2));
// }


// }
// // btn.addEventListener("click", FoodApi);


// async function Initial(value){
// food.innerHTML = "";
// value.map(async(i)=>{
//     const recipe = `https://api.spoonacular.com/recipes/${i.id}/information?includeNutrition=false`

//     const recipe2 = await recipe.json();
//     console.log(recipe2);
//     // generateHTML(recipe2);
// })

// }
// // function generateHTML(results){

// // const item = document.createElement("span");
// // const img = document.createElement("img");
// // const title = document.createElement("h3");
// // let RecipeBtn = document.createElement("Button");
// // item.setAttribute("class", "grid");
// // function RecipeData(){
// //     ingrediants.innerHTML = "";
// //     ingrediants.innerHTML = `<h2>Your Ingrediants</h2>`;
// //     let apiIngrediants = results.extendedIngredients;
// //     for(let i=0 ; i<apiIngrediants;i++){
// //         let box = document.createElement("li");
// //         let newBox  = apiIngrediants[i].original;
// //         box.innerHTML = newBox;
// //         ingrediants.appendChild(box);
// //     }
// // }


// // }


// // second step
// async function InitialMeal(){
//     const url = await FoodApi();
//     await Initial(url.meals);
// }

// InitialMeal();











// // let food = document.querySelector('#foods');
// // let API_KEY = 'a20d05ab59fd48c19c646093dafc749b';
// // let weight = document.querySelector('#weight');
// // let height = document.querySelector('#height');
// // let age = document.querySelector('#age');
// // let minCalories = 200;
// // let maxCalories = 1000;
// // let btn = document.querySelector('#btn');
// // let gender = document.querySelector('#gender');
// // let activity = document.querySelector('#activity');
// // btn.addEventListener('click', btnClick);

// // function recipe(event) {
// //   if (event.target.nextElementSibling.classList.contains('frame')) {
// //     event.target.nextElementSibling.classList.replace('frame', 'show');

// //   } else {
// //     event.target.nextElementSibling.classList.replace('show', 'frame');
// //   }
// // }

// // function btnClick() {
// //   if (height.value == '' || weight.value == '' || age.value == '' || activity.value == "null") {
// //     alert('All the fields are Mandatory');
// //     return;
// //   }
// //   if(height.value <= 0 || age <= 0 || height.value > 250 || weight.value > 150 || age.value > 100){
// //     alert("Please Enter Valid Values");
// //     return;
// //   }
// //   getData();
  
// // }
// // async function getData() {

// //   console.log("started");
// //   console.log(gender.value);
// //   food.innerHTML = `<button class="btn btn-primary" type="button" disabled>
// //         <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
// //         Loading...
// //       </button>`;

// //   if (gender.value == "male" && activity.value === "light") {
// //     var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
// //     maxCalories = BMR * 1.375;
// //     console.log('male light');
// //   }

// //   else if (gender.value === "male" && activity.value === "moderate") {
// //     var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
// //     maxCalories = BMR * 1.55;
// //     console.log('male moderate')
// //   }

// //   else if (gender.value === "male" && activity.value === "active") {
// //     var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
// //     maxCalories = BMR * 1.725;
// //     console.log('male active')
// //   }

// //   else if (gender.value === "female" && activity.value === "light") {
// //     var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
// //     maxCalories = BMR * 1.375;
// //     console.log('female light')
// //   }

// //   else if (gender.value === "female" && activity.value === "moderate") {
// //     var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
// //     maxCalories = BMR * 1.55;
// //     console.log('female moderate')
// //   }

// //   else if (gender.value === "female" && activity.value === "active") {
// //     var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
// //     maxCalories = BMR * 1.725;
// //     console.log('female active')
// //   }

// //   maxCalories = Math.round(maxCalories);
// //   console.log("max calories => " + maxCalories);

// //   try {
// //     let apiData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&maxCalories=${maxCalories}&number=4&apiKey=${API_KEY}&includeNutrition=true`);
// //     var data = await apiData.json();
// //     console.log("api data sucessful");
// //   }
// //   catch (e) {
// //     console.log("entered catch block");
// //     food.innerHTML = `<h1>${e}</h1>`;
// //   }


// //   data = data.results;
// //   console.log(data);


// //   let html = '';
// //   data == undefined ? html = `<h1>API limit reached please try again after 24Hrs</h1>` :

// //     html = await data.map((ele) => {
// //       return (
// //         `
// //             <div class='displayCard'>
// //             <h3>${ele.title}</h3>
// //             <img src= ${ele.image} alt = "image"/>
          
// //           <br>
// //           <br>
// //             <p>
// //             ${ele.summary
// //         }
// //             </p>
// //             <div class="recipeBox">
// //             <button type="button" onclick="recipe(event)"  class="btn btn-primary">Recipe</button>
// //             <iframe src=${ele.sourceUrl} class="frame"  width="90%" title="Recipe"></iframe>
// //             </div>
           
// //             <p>Source : ${ele.sourceName}</p>
// //             <span>
// //             <bold>Ready in ${ele.readyInMinutes} min</bold>
// //             </span>
            
// //             </div>
// //         `
// //       )
// //     })

// //   food.innerHTML = html;
// //   console.log(' reached end');
// // }}
// // getData();