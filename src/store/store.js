import { create } from "zustand";
import _ from "lodash";

const usePokemonStore = create((set) => ({
  pokemonList: [],
  setPokemonList: (newArray) => {
    set(() => ({
      pokemonList: [...newArray],
    }));
  },
  pageOffset: 0,
  setPageOffset: (increase) => set({ pageOffset: increase }),
  searchText: "",
  setSearchText: (inputText) => set({ searchText: inputText }),
  targetPokemon: "",
  setTargetPokemon: (object) => set(() => ({ targetPokemon: { ...object } })),
  loading: false,
  setLoading: (flag) => set({ loading: flag }),
  evolutionChainArray: [],
  setEvolutionChainArray: (newArray) => {
    set(() => ({
      evolutionChainArray: [...newArray],
    }));
  },
  cleanUpPokemonList: () => {
    set(() => ({
      pokemonList: [],
      loading: false,
    }));
  },
}));
export default usePokemonStore;
