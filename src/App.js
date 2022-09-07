import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";
import { NavContext } from "./components/navbar/NavContext";

import HouseDetail from "./components/detail/HouseDetail";
import Home from "./components/Home";

import Footer from "./components/Footer";
import Navbar from "../src/components/navbar/NavBar";
import SearchResults from "./components/navbar/SearchResult";
import LakeFront from "./components/filter/LakeFront";
import Beach from "./components/filter/Beach";
import Cabins from "./components/filter/Cabins";

function App() {
  // const { searchInput } = useContext(NavContext);
  const { currentHomesData } = useContext(NavContext);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/housedetail/:id" element={<HouseDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Lakefront" element={<LakeFront />} />
          <Route path="/Beach" element={<Beach />} />
          <Route path="/Cabins" element={<Cabins />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
