import { recipes } from './recipes.mjs';

const recipeSection = document.querySelector('.recipes-container');
const searchForm = document.querySelector('form');
const searchInput = document.getElementById('search');

// Render a single recipe card
function renderRecipe(recipe) {
  const article = document.createElement('article');
  article.classList.add('recipe-card');

  article.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}">
    <div class="recipe-info">
      <div class="tags">
        ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <h2>${recipe.name}</h2>
      <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
        ${'⭐'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}
      </span>
      <p class="description">${recipe.description}</p>
    </div>
  `;

  recipeSection.appendChild(article);
}

// Display filtered recipes
function displayRecipes(filter = '') {
  recipeSection.innerHTML = '';
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(filter.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  if (filtered.length === 0) {
    recipeSection.innerHTML = '<p>No matching recipes found.</p>';
    return;
  }

  filtered.forEach(renderRecipe);
}

// Handle search
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  displayRecipes(searchInput.value.trim());
});

// Initial load
displayRecipes();
