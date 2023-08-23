import "./Card.css";
import usePokemonStore from "../store/store";
import { Link } from "react-router-dom";

const Card = () => {
  const { pokemonList, setTargetPokemon } = usePokemonStore();
  // const setData = (items) => {
  //   setTargetPokemon(items);
  // };
  return (
    <>
      {pokemonList.map((items, index) => {
        const url = "/detail?id=" + items.id;
        return (
          <div className="card-container-div" key={index}>
            <Link to={url} onClick={() => setTargetPokemon(items)}>
              <div className="img-area">
                <img src={items.sprites.front_default} alt="pokemon" />
                <div className="title">{items.ko_name}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Card;
