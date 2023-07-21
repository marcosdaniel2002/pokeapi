import 'core-js/stable'; // for old browsers
import 'regenerator-runtime/runtime'; // for old browsers

import * as model from './model.js';
import generationView from './views/generationView.js';
import resultPokemonsView from './views/resultPokemonsView.js';
import paginationView from './views/paginationView.js';
import detailsView from './views/detailsView.js';
import capturedPokemonsView from './views/capturedPokemonsView.js';

const controlShowGenerations = async function () {
  try {
    await model.loadGenerations();
    generationView.load(model.state.searchGenerations.generations);
  } catch (err) {}
};

const controlSearchPokemons = async function (genNumber) {
  try {
    // load pokemons of any generation
    resultPokemonsView.renderLoad();
    paginationView.render();
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

const controlAddPokemonBookmark = function (pokemonCaptured) {
  resultPokemonsView.checkCapturePokeballImage(pokemonCaptured.id, true);
  model.addPokemonCaptured(pokemonCaptured);
  capturedPokemonsView.render(model.state.pokemonBookmarks);
};

const controlRemovePokemonBookmark = function (id, isReplace = false) {
  resultPokemonsView.checkCapturePokeballImage(id, false);
  if (isReplace) {
    model.removePokemonCaptured(id, isReplace);
  } else {
    model.removePokemonCaptured(id, isReplace);
  }
  capturedPokemonsView.render(model.state.pokemonBookmarks);
};

const init = function () {
  controlShowGenerations();
  generationView.addHandlerGenerationView(controlSearchPokemons);
  paginationView.addHandlerClick(controlPagination);
  resultPokemonsView.addHandlerCardDetail(controlDetails);
  detailsView.addHandlerCapturePokemon(controlAddPokemonBookmark);
  detailsView.addHandlerRemovePokemon(controlRemovePokemonBookmark);
  capturedPokemonsView.addHandlerReplacePokemon(controlRemovePokemonBookmark);
};
init();
