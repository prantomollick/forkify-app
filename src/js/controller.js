import 'core-js/stable';
import { async } from 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlRecipeSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    //3) Render results
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  recipeView.addHanlderRender(controlRecipes);
  searchView.addHandlerSearch(controlRecipeSearchResults);
};

init();
