import { recipes } from './recipe.mjs'; // ← This works *only if* recipes.mjs is in the same folder

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function getRandomListEntry(list) {
  const index = getRandomIndex(list.length);
  return list[index];
}

function tagsTemplate(tags) {
  return `<ul class="recipe__tags">
    ${tags.map(tag => `<li>${tag}</li>`).join('')}
  </ul>`;
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += i <= rating
      ? `<span aria-hidden="true" class="icon-star">⭐</span>`
      : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
    <figure class="recipe">
      <img src="${recipe.image}" alt="Image of ${recipe.name}" />
      <figcaption>
        ${tagsTemplate(recipe.tags)}
        <h2><a href="#">${recipe.name}</a></h2>
        <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
        <p class="recipe__description">${recipe.description}</p>
      </figcaption>
    </figure>
  `;
}

function renderRecipes(recipeList) {
  const container = document.querySelector('.recipes-container');
  container.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
}

function filterRecipes(query) {
  query = query.toLowerCase();
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query) ||
    recipe.tags.find(tag => tag.toLowerCase().includes(query))
  );
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
  event.preventDefault();
  const input = document.getElementById('search');
  const query = input.value.trim().toLowerCase();
  const results = filterRecipes(query);

  if (results.length === 0) {
    document.querySelector('.recipes-container').innerHTML = '<p>No matching recipes found.</p>';
  } else {
    renderRecipes(results);
  }
}

function init() {
  const randomRecipe = getRandomListEntry(recipes);
  renderRecipes([randomRecipe]);

  const form = document.querySelector('form');
  form.addEventListener('submit', searchHandler);
}

init();
