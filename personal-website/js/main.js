// Sample Pantry Items and Recipes
const pantry = ["chicken", "rice", "tomato", "basil"];
const recipes = [
  {
    name: "Tomato Basil Pasta",
    ingredients: ["tomato", "basil", "pasta", "olive oil"],
    instructions: "Boil pasta. Cook tomato and basil in olive oil. Combine.",
  },
  {
    name: "Chicken Rice Bowl",
    ingredients: ["chicken", "rice", "soy sauce", "carrot"],
    instructions: "Cook rice. Saute chicken with soy sauce and carrot. Serve together.",
  }
];

function filterRecipes() {
  const output = document.getElementById("recipe-output");
  output.innerHTML = "";

  const matches = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient => pantry.includes(ingredient))
  );

  matches.forEach(recipe => {
    const div = document.createElement("div");
    div.classList.add("recipe-card");
    div.innerHTML = `<h3>${recipe.name}</h3><p>${recipe.instructions}</p>`;
    output.appendChild(div);
  });
}

// DOM Interaction
const filterBtn = document.getElementById("filter-btn");
if (filterBtn) {
  filterBtn.addEventListener("click", filterRecipes);
}

