import "./PokemonDetail.css";
import { GetEvolutionChain, GetDetailPokemonObject } from "../apis/pokemonAPI";
import _ from "lodash";
import usePokemonStore from "../store/store";
import { useEffect } from "react";
const PokemonDetail = () => {
  const { targetPokemon, evolutionChainArray, setEvolutionChainArray } =
    usePokemonStore();

  const loadData = async () => {
    try {
      const temp = [];
      const { data } = await GetEvolutionChain(targetPokemon.id);
      const chainArray = [
        data.chain.species.name,
        data.chain.evolves_to[0]?.species.name,
        data.chain.evolves_to[0]?.evolves_to[0]?.species.name,
      ];
      for (let i = 0; i < chainArray.length; i++) {
        if (chainArray[i] !== undefined) {
          const res = await GetDetailPokemonObject(chainArray[i]);
          temp.push({
            ...res.data,
          });
        }
      }
      setEvolutionChainArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="detail-pokemon-container">
      <div className="left-content">
        <div>
          <h1>Evolution Chain</h1>
          {evolutionChainArray.map((items, index) => {
            return (
              <div className="detail-card" key={index}>
                <div className="detail-title">{items.name}</div>
                <img
                  className="evloution-image"
                  src={items.sprites.front_default}
                  alt="pokemon"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="right-content">
        <div className="target-img">
          <div className="detail-title">{targetPokemon.name}</div>
          <img src={targetPokemon.sprites.front_default} alt="pokemon" />
          <div className="abilities">
            {targetPokemon.abilities.map((items, index) => {
              return (
                <div className="group" key={index}>
                  <h2>{items.ability.name}</h2>
                </div>
              );
            })}
          </div>
          <div className="base-stat">
            {targetPokemon.stats.map((items, index) => {
              return (
                <h3 key={index}>
                  {items.stat.name}: {items.base_stat}
                </h3>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
