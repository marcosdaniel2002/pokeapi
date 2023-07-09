import 'core-js/stable'; // for old browsers
import 'regenerator-runtime/runtime'; // for old browsers

import * as model from './model.js';
import generationView from './views/generationView.js';
import sliderView from './views/sliderView.js';
import resultPokemonsView from './views/resultPokemonsView.js';

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
    await model.loadPokemons(genNumber);
    await model.loadResultPokemons();
    resultPokemonsView.render(model.resultsPerPage(2));
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  controlShowGenerations();
  sliderView.addHandlerSlider(controlSearchPokemons);
};
init();

// sliderView;
