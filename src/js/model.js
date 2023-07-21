// import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import {
  getGenerations,
  getPokemonsGeneration,
  getPokemon,
  getPokemonDetail,
} from './helpers';

export const state = {
  searchGenerations: {
    generations: [],
    pokemons: [],
    resultPokemons: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
    numOfPages: '',
  },
  pokemonDetail: [],
  pokemonBookmarks: {
    pokemons: [],
    maxPokemons: 6,
  },
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
        bookmark: state.pokemonBookmarks.pokemons.some(
          bookmark => bookmark.id === data.id
        ),
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

export const loadPokemonDetail = async function (id) {
  try {
    const data = await getPokemonDetail(`${API_URL}pokemon/${id}/`);
    state.pokemonDetail = data.map(pokemon => {
      return {
        id: pokemon[1].id,
        name: pokemon[1].name,
        types: pokemon[1].types.map(t => t.type.name),
        image: pokemon[1].sprites.other['official-artwork'].front_default,
        icon: pokemon[1].sprites.versions['generation-viii'].icons
          .front_default,
        description: pokemon[0].flavor_text_entries[0].flavor_text,
        bookmark: state.pokemonBookmarks.pokemons.some(
          bookmark => bookmark.id === pokemon[1].id
        ),
      };
    });
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

export const addPokemonCaptured = function (pokemonCaptured) {
  state.pokemonBookmarks.pokemons.push(pokemonCaptured);

  state.searchGenerations.resultPokemons.find(
    pokemon => pokemon.id === pokemonCaptured.id
  ).bookmark = true;
};

export const removePokemonCaptured = function (id, isReplace) {
  state.searchGenerations.resultPokemons.find(
    pokemon => pokemon.id === id
  ).bookmark = false;

  const index = state.pokemonBookmarks.pokemons.findIndex(el => el.id === id);

  if (isReplace) {
    state.pokemonBookmarks.pokemons.splice(
      index,
      1,
      state.pokemonBookmarks.pokemons.splice(-1)[0]
    );
  } else {
    state.pokemonBookmarks.pokemons.splice(index, 1);
  }
  console.log(state.pokemonBookmarks.pokemons);
};

// ([\/][0-9]{1,})
// (?<=[\/])\d{1,}
