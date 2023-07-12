import 'core-js/stable'; // for old browsers
import 'regenerator-runtime/runtime'; // for old browsers

import * as model from './model.js';
import generationView from './views/generationView.js';
import resultPokemonsView from './views/resultPokemonsView.js';
import paginationView from './views/paginationView.js';
import detailsView from './views/detailsView.js';

const controlShowGenerations = async function () {
  try {
    await model.loadGenerations();
    generationView.load(model.state.searchGenerations.generations);
  } catch (err) {}
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

const controlDetails = async function (id) {
  await model.loadPokemonDetail(id);
  detailsView.load(model.state.pokemonDetail, id);
};

const init = function () {
  controlShowGenerations();
  generationView.addHandlerGenerationView(controlSearchPokemons);
  paginationView.addHandlerClick(controlPagination);
  resultPokemonsView.addHandlerCardDetail(controlDetails);
};
init();
