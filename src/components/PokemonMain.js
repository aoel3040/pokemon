import "./PokemonMain.css";
import usePokemonStore from "../store/store";
import Search from "./Search";
import Card from "./Card";

import {
  GetPokemonList,
  GetDetailPokemonObject,
  GetPokemonSpeciesObject,
} from "../apis/pokemonAPI";
import { useEffect } from "react";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const PokemonMain = () => {
  const {
    pokemonList,
    setPokemonList,
    pageOffset,
    setPageOffset,
    loading,
    setLoading,
  } = usePokemonStore();
  const createDetailPokemonList = async (result) => {
    setLoading(true);
    let temp = [];
    for (let i = 0; i < result.length; i++) {
      try {
        const res = await GetDetailPokemonObject(result[i].name);
        const speciesRes = await GetPokemonSpeciesObject(result[i].name);
        const koName = speciesRes.data.names.find(
          (name) => name.language.name === "ko"
        ).name;
        temp.push({
          ...res.data,
          ko_name: koName,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    const temparr = [...pokemonList, ...temp];
    setPokemonList(temparr);
  };

  useEffect(() => {
    const getPokemonList = async () => {
      const { data } = await GetPokemonList(pageOffset);
      createDetailPokemonList(data.results);
    };
    getPokemonList();
    return () => {};
  }, [pageOffset]);

  const hanleScrollEvent = () => {
    const cnt = pageOffset + 20;
    setPageOffset(cnt);
  };

  return (
    <InfiniteScroll
      dataLength={pokemonList.length}
      next={hanleScrollEvent}
      hasMore={true}
    >
      <div className="container">
        <div className="content-container">
          <Search></Search>
          <div className="card-container">
            <Card />
          </div>
        </div>
        <div className="loading">{loading ? "LOADING..." : ""}</div>
      </div>
    </InfiniteScroll>
  );
};

export default PokemonMain;
