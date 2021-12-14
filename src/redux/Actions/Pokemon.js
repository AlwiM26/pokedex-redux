import api from "../../services/api";

export const getPokemons = (offset) => async (dispatch) => {
  const pokemons = await getPokemonList(offset);
  dispatch({ type: "GET_POKEMONS", payload: pokemons });
};

const getPokemonList = async offset => {
  // get all the pokemon list with
  const res = await api.get(`/pokemon/?limit=10&offset=${offset}`);
  const pokemonList = await res.data.results;

  let pokemons = await Promise.all(pokemonList.map(pokemon => getPokemonDetail(pokemon.name)));

  return pokemons;
};

const getPokemonDetail = async name => {
  const res = await api.get(`/pokemon/${name}`);
  const pokemonDetail = await res.data;
  
  return pokemonDetail;
};