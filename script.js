const searchBox= document.querySelector('.Search-box');
const searchBtn=document.querySelector('.search-btn');
const recipeContainer =document.querySelector('.recipe-container');
const recipeDetailsContent =document.querySelector('.recipe-details-content');
const closeBtn = document.querySelector('.recipe-close-btn')
//function to get recipes
const fetchRecipes = async(query)=>{
  recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>";
  try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json(); //we will convert the promise into jason and store it in respose variable
    //we will pass the value of query variable to the api,variable fetch  return a promise that will be stored in data variable
    recipeContainer.innerHTML ="";//emptying the container
    response.meals.forEach(meal => { //iterating in all ele present in a given query
        //creating a div
        // console.log(meal);
       const recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');//adding a class name to div
       recipeDiv.innerHTML = `
       <img src="${meal.strMealThumb}"> 
      <h3>${meal.strMeal}</h3>
      <p>${meal.strArea}</p>
       `
       //creating a button
       const button = document.createElement('button');
       button.textContent="View Recipe";
       recipeDiv.appendChild(button);//appending the button in recipediv
     //it is the var in which images are stored

     //adding eventlistener to recipe button
     button.addEventListener('click',()=>{
       openRecipe(meal);
     });
       recipeContainer.appendChild(recipeDiv);//appending the created div to the recipecontainer.
    });

  } catch(error){
    recipeContainer.innerHTML = "<h2>Error in Fetching recipes</h2>";
  }
   //here query is the name of callvalue
    //ex-query=cake
   
} 
//function to fetch ingredients
const fetchIngredinets =(meal)=>{
  let ingredientslist ="";
  for (let i=1;i<=20;i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
      const measure = meal[`strMeasure${i}`];
      ingredientslist+=`<li>${measure} ${ingredient}</li>`
    }
    else{
      break;
    }
  }
  return ingredientslist;
}
const openRecipe =(meal)=>{
  recipeDetailsContent.innerHTML =`<h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredients:</h3>
  <ul class=" ingredientslist">${fetchIngredinets(meal)}</ul

  <div>
   <h3>Instructions:</h3>
  <p class="recipeInstructions">${meal.strInstructions}</p>
  </div>`
    recipeDetailsContent.parentElement.style.display = "block";
}
//for closing the recipe
  closeBtn.addEventListener('click',(e)=>{
recipeDetailsContent.parentElement.style.display ="none";
  });
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);//searchinput is the value of prompt written in searchbox
});