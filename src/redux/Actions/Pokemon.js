import api from "../../services/api";

export const getPokemons = (offset) => async (dispatch) => {
  const pokemons = await getPokemonList(offset);
  dispatch({ type: "GET_POKEMONS", payload: pokemons });
};

const getPokemonList = async offset => {
  const pokemonList = await api.get(`/pokemon?limit=${offset}`)
    .then(value => {
      return value.data.results;
    });

  let pokemons = [];

  await Promise.all(pokemonList.map(pokemon => getPokemonDetail(pokemon.name)))
    .then(value => {
      pokemons = value;
    });

  return pokemons;
};

const getPokemonDetail = async name => {
  const pokemonDetail = await api.get(`/pokemon/${name}`)
    .then(res => res.data);
  
  return pokemonDetail;
};