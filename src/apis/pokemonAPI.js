import { PokemonUrl } from "../plugins/enum";
import { API } from "../plugins/axios";

export const GetPokemonList = async (pageOffset) => {
  return await API.get(PokemonUrl.GET_LIST_OF_POKEMON + "?limit=20", {
    params: { offset: pageOffset },
  });
};

export const GetPokemonObject = async (id) => {
  return await API.get(PokemonUrl.GET_LIST_OF_POKEMON + `/${id}`);
};

export const GetDetailPokemonObject = async (name) => {
  let data = await API.get(PokemonUrl.GET_LIST_OF_POKEMON + `/${name}`);
  return data;
};

export const GetPokemonSpeciesObject = async (name) => {
  return await API.get(PokemonUrl.GET_SPECIES_POKEMON + `/${name}`);
};

export const GetEvolutionChain = async (id) => {
  return await API.get(PokemonUrl.GET_EVOLUTION_CHAIN + `/${id}`);
};
