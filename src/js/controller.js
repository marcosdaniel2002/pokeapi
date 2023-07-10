import 'core-js/stable'; // for old browsers
import 'regenerator-runtime/runtime'; // for old browsers

import * as model from './model.js';
import generationView from './views/generationView.js';
import sliderView from './views/sliderView.js';
import resultPokemonsView from './views/resultPokemonsView.js';
import paginationView from './views/paginationView.js';

const controlShowGenerations = async function () {
  try {
    await model.loadGenerations();
    const markup = generationView.load(
      model.state.searchGenerations.generations
    );
    sliderView.render(markup);
    sliderView.activeSlider();
  } catch (err) {
    sliderView.renderError(err);
  }
};

const controlSearchPokemons = async function (genNumber) {
  try {
    // load pokemons of any generation
    await model.loadPokemons(genNumber);
    await model.loadResultPokemons();

    // render pokemons per page
    resultPokemonsView.render(model.resultsPerPage(1));

    // render pagination initial
    paginationView.render(model.state.searchGenerations);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultPokemonsView.render(model.resultsPerPage(goToPage));
};

const init = function () {
  controlShowGenerations();
  sliderView.addHandlerSlider(controlSearchPokemons);
  paginationView.addHandlerClick(controlPagination);
};
init();

// sliderView;
