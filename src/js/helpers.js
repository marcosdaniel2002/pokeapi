import { TIMEOUT_SEC } from './config';
import { API_URL } from './config';

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

export const getSpeciesPokemon = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    if (!res.ok)
      throw new Error(
        'Something wrong with try to search that species pokemon fetch!'
      );

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getEvolutionChainPokemon = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    if (!res.ok)
      throw new Error(
        'Something wrong with try to search that evolution chain pokemon fetch!'
      );

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getPokemonDetail = async function (url) {
  try {
    const resPokemon = await getPokemon(url);
    const resSpeciesPokemon = await getSpeciesPokemon(resPokemon.species.url);
    const resChain = await getEvolutionChainPokemon(
      resSpeciesPokemon.evolution_chain.url
    );

    const pokemonChain = [];
    let bool = true;
    while (bool) {
      const pokemonData = [];
      pokemonData.push(await getSpeciesPokemon(resChain.chain.species.url));
      pokemonData.push(
        await getPokemon(`${API_URL}pokemon/${pokemonData[0].id}/`)
      );
      pokemonChain.push(pokemonData);

      resChain.chain.evolves_to.length
        ? (resChain.chain = resChain.chain.evolves_to[0])
        : (bool = false);
    }
    return pokemonChain;
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

// export const getPokemonDetail = async function (url1, url2) {
//   try {
//     const urls = [url1, url2];
//     const response = await Promise.all(
//       urls.map(async url => {
//         const res = await fetch(url);

//         if (!res.ok)
//           throw new Error(
//             `Something wrong with try to search detail of pokemon fetch! ${url}`
//           );

//         return res.json();
//       })
//     );
//     return response;
//   } catch (err) {
//     throw err;
//   }
// };
