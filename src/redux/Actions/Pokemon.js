import api from "../../services/api";

export const getPokemons =
  (offset = 0) =>
  async (dispatch) => {
    const pokemons = await getPokemonList(offset);
    dispatch({ type: "GET_POKEMONS", payload: pokemons });
  };

const getPokemonList = async (offset) => {
  const res = await api.get(`/pokemon/?limit=10&offset=${offset}`);
  const pokemonList = await res.data.results;

  let pokemons = await Promise.all(
    pokemonList.map((pokemon) => getPokemonDetail(pokemon.name))
  );

  return pokemons;
};

const getPokemonDetail = async (name) => {
  const res = await api.get(`/pokemon/${name}`);
  const pokemonDetail = await res.data;

  const speciesId = parseInt(pokemonDetail.species.url.split("/").reverse()[1]);
  const pokemonSpecies = await getPokemonSpecies(speciesId);

  const evolutionChain = await getPokemonEvolutionChain(
    pokemonSpecies.evolutionChainId
  );

  const pokemon = {
    id: pokemonDetail.id,
    name: pokemonDetail.name,
    height: pokemonDetail.height,
    weight: pokemonDetail.weight,
    stats: pokemonDetail.stats,
    types: pokemonDetail.types,
    abilities: pokemonDetail.abilities,
    pokemonSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.id}.png`,
    color: pokemonSpecies.color,
    textEntries: pokemonSpecies.textEntries,
    growthRate: pokemonSpecies.growthRate,
    habitat: pokemonSpecies.habitat,
    eggGroups: pokemonSpecies.eggGroups,
    captureRate: pokemonSpecies.captureRate,
    genderRate:
      pokemonSpecies.genderRate === 1
        ? 50
        : pokemonSpecies.genderRate === -1
        ? -1
        : (pokemonSpecies.genderRate / 8) * 100,
    evolutionChain: evolutionChain,
  };

  return pokemon;
};

const getPokemonSpecies = async (speciesId) => {
  const res = await api.get(`/pokemon-species/${speciesId}`);
  const pokemonSpecies = await res.data;

  const textEntries = pokemonSpecies.flavor_text_entries
    .filter((item) => item.language.name === "en")[0]
    .flavor_text.replace(
      /(^|[.!?]\s+)([a-z])/g,
      (_, x, y) => x + y.toUpperCase()
    )
    .replace("\u000c", " ")
    .replace(/\r?\n|\r/g, " ");
  const evolutionChainId = parseInt(
    pokemonSpecies.evolution_chain.url.split("/").reverse()[1]
  );

  const species = {
    color: pokemonSpecies.color.name,
    textEntries: textEntries,
    growthRate: pokemonSpecies.growth_rate.name,
    habitat: pokemonSpecies.habitat.name,
    eggGroups: pokemonSpecies.egg_groups,
    captureRate: pokemonSpecies.capture_rate,
    genderRate: pokemonSpecies.gender_rate,
    evolutionChainId: evolutionChainId,
  };

  return species;
};

const getPokemonEvolutionChain = async (evolutionChainId) => {
  try {
    const res = await api.get(`/evolution-chain/${evolutionChainId}`);
    let pokemonEvolutionChain = await res.data.chain;
    let evolutionList = [];

    while (pokemonEvolutionChain.evolves_to.length > 0) {
      let pokemonId = pokemonEvolutionChain.species.url.split("/").reverse()[1];
      let evolveToId =  pokemonEvolutionChain.evolves_to[0].species.url.split("/").reverse()[1];
      let evolution = {
        pokemonName: pokemonEvolutionChain.species.name,
        pokemonSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`, 
        evolveToName: pokemonEvolutionChain.evolves_to[0].species.name,
        evolveToSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolveToId}.png`,
        minLevel: pokemonEvolutionChain.evolves_to[0].evolution_details[0].min_level ? pokemonEvolutionChain.evolves_to[0].evolution_details[0].min_level : 0,
      };

      pokemonEvolutionChain = pokemonEvolutionChain.evolves_to[0];
      evolutionList = [...evolutionList, evolution];
    }

    return evolutionList;
  } catch (err) {
    console.error(err);
  }
};
