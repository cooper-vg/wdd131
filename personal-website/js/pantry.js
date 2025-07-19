// Load pantry from localStorage or default
let pantry = JSON.parse(localStorage.getItem("pantry")) || ["chicken", "rice", "tomato", "basil"];

// Recipes for filtering (used on meal-ideas.html)
const recipes = [
  {
    name: "Tomato Basil Pasta",
    ingredients: ["tomato", "basil", "pasta", "olive oil"],
    instructions: "Boil pasta. Cook tomato and basil in olive oil. Combine.",
  },
  {
    name: "Chicken Rice Bowl",
    ingredients: ["chicken", "rice", "soy sauce", "carrot"],
    instructions: "Cook rice. Sauté chicken with soy sauce and carrot. Serve together.",
  }
];

// Renders pantry list on pantry.html
function renderPantry() {
  const list = document.getElementById("pantry-list");
  if (!list) return;

  list.innerHTML = "";
  pantry.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", () => {
      pantry.splice(index, 1);
      updatePantry();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Saves pantry to localStorage, sorts alphabetically, and re-renders
function updatePantry() {
  pantry.sort();
  localStorage.setItem("pantry", JSON.stringify(pantry));
  renderPantry();
}

// Handles pantry form submission
const pantryForm = document.getElementById("pantry-form");
if (pantryForm) {
  pantryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("ingredient-input");
    const newItem = input.value.trim().toLowerCase();

    if (newItem && !pantry.includes(newItem)) {
      pantry.push(newItem);
      updatePantry();
      input.value = "";
    }
  });

  updatePantry();
}

// Filters and displays recipes (on meal-ideas.html)
function filterRecipes() {
  const output = document.getElementById("recipe-output");
  if (!output) return;

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

const filterBtn = document.getElementById("filter-btn");
if (filterBtn) {
  filterBtn.addEventListener("click", filterRecipes);
}
