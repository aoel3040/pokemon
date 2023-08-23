import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PokemonMain from "./components/PokemonMain";
import PokemonDetail from "./components/PokemonDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PokemonMain />} />
          <Route path="/detail" element={<PokemonDetail />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
