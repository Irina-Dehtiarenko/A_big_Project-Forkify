/* Latest Code Updates (Parcel v2 and more)
1️⃣ PARCEL

I use Parcel v2@BETA in the videos, but right now the stable Parcel v2 has been released, and there are some differences. Don't worry, it's nothing groundbreaking, so there is no need for new videos. It's just some small adjustments in some cases 😃

👉 Now, if you don't run into any issues by following the videos as they are, then you don't need to do anything.

👉 If you do have issues with Parcel, you can now find updated starter and final code in a new branch in the course repo, called updates-and-fixes 🐛.

👉 Parcel v2 has changed the way it names bundled files (the ones in the dist directory). You can see a JavaScript file called controller.js in my files, but for you, it may appear as index.js. Don't worry though, everything works the same.



2️⃣ OTHERS

The updated code also uses a package called Fracty instead of Fractional for later in the project (along with some necessary code changes), as there have been some issues with deployment when using Factional.



I hope this helps and solves any issues you might find. Let me know in the Q&A if it does ✌️ */

///////////////////////////////////////

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 3) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //  1) Loading recipe
    await model.loadRecipe(id);

    //  2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //  1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);

    resultsView.render(model.getSearchResultsPage());
    //  4) Render initial pagination buttons

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) Render NEW results
  // resultsView.render(model.state.search.results);

  resultsView.render(model.getSearchResultsPage(goToPage));
  //  4) Render NEW pagination buttons

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe serving(in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark niew
    bookmarksView.render(model.state.bookmarks);

    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🛑', err);
    addRecipeView.renderError(err.message);
  }
};

// Publisher-subscriber pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addhandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
