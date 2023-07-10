// import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getGenerations, getPokemonsGeneration, getPokemon } from './helpers';

export const state = {
  searchGenerations: {
    generations: [],
    pokemons: [],
    resultPokemons: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
    numOfPages: '',
  },
  pokemonDetail: {},
};

export const loadResultPokemons = async function () {
  try {
    state.searchGenerations.resultPokemons = [];
    for (const id of state.searchGenerations.pokemons) {
      const data = await getPokemon(`${API_URL}pokemon/${id}/`);

      state.searchGenerations.resultPokemons.push({
        id: data.id,
        name: data.name,
        types: data.types.map(t => t.type.name),
        image: data.sprites.other['official-artwork'].front_default,
      });
    }
  } catch (err) {
    throw err;
  }
};

export const loadGenerations = async function () {
  try {
    const data = await getGenerations(`${API_URL}generation/`);

    state.searchGenerations.generations = data;
  } catch (err) {
    throw err;
  }
};

export const loadPokemons = async function (genNumber) {
  try {
    const data = await getPokemonsGeneration(
      `${API_URL}generation/${genNumber}/`
    );
    state.searchGenerations.pokemons = data.map(poke =>
      poke.url.match(/(?<=[\/])\d{1,}/g).join('')
    );
    getNumberOfPages();
    console.log(state.searchGenerations.numOfPages);
  } catch (err) {
    throw err;
  }
};

export const resultsPerPage = function (pageNumber = 1) {
  state.searchGenerations.page = pageNumber;
  const start = (pageNumber - 1) * state.searchGenerations.resultsPerPage;
  const end = pageNumber * state.searchGenerations.resultsPerPage;
  return state.searchGenerations.resultPokemons.slice(start, end);
};

const getNumberOfPages = function () {
  state.searchGenerations.numOfPages = Math.ceil(
    state.searchGenerations.pokemons.length /
      state.searchGenerations.resultsPerPage
  );
};

// ([\/][0-9]{1,})
// (?<=[\/])\d{1,}
