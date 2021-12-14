import { combineReducers } from "redux";
import pokemonsReducer from "./Pokemon";

const reducers = combineReducers({
  pokemons: pokemonsReducer,
});

export default reducers;