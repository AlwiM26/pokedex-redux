const initialState = {
  pokemons: [],
  offset: 0,
};

const pokemonsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_POKEMONS":
      const allPokemons = state.pokemons.concat(payload);
      const newOffset = allPokemons.length;
      return {
        ...state,
        pokemons: allPokemons,
        offset: newOffset,
      };
    default:
      return state;
  }
};

export default pokemonsReducer;
