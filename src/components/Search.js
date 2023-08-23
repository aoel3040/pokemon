import "./Search.css";
import usePokemonStore from "../store/store";
import {
  GetDetailPokemonObject,
  GetPokemonSpeciesObject,
} from "../apis/pokemonAPI";

const Search = () => {
  const { setPokemonList, cleanUpPokemonList, searchText, setSearchText } =
    usePokemonStore();
  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const onClickSearch = async () => {
    if (searchText.length === 0) {
      alert("검색하실 포켓몬 번호를 입력해주세요.");
      return;
    }
    let temp = [];
    try {
      const res = await GetDetailPokemonObject(searchText);
      const speciesRes = await GetPokemonSpeciesObject(searchText);
      const koName = speciesRes.data.names.find(
        (name) => name.language.name === "ko"
      ).name;
      temp.push({
        ...res.data,
        ko_name: koName,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    cleanUpPokemonList();
    setPokemonList(temp);
  };

  return (
    <div className="search-area">
      <input
        placeholder="검색하실 포켓몬 번호를 입력해주세요."
        onChange={onChangeSearchText}
        type="number"
      />
      <button onClick={onClickSearch}>검색</button>
    </div>
  );
};

export default Search;
