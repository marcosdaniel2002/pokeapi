import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, s * 1000);
  });
};

export const getPokemon = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    if (!res.ok)
      throw new Error('Something wrong with try to search that pokemon fetch!');

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getGenerations = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    if (!res.ok) throw new Error('Something wrong with generations fetch!');

    const { results: data } = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const getPokemonsGeneration = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    if (!res.ok)
      throw new Error('Something wrong with pokemon generations fetch!');

    const { pokemon_species } = await res.json();

    return pokemon_species;
  } catch (err) {
    throw err;
  }
};
