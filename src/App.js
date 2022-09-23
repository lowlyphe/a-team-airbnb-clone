import "./App.css";
import React, { useState } from "react";

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
import Wishlist from "./components/Wishlist";
import Footer from "./components/Footer";
import Navbar from "../src/components/navbar/NavBar";
import SearchResults from "./components/navbar/SearchResult";
import LakeFront from "./components/filter/LakeFront";
import Beach from "./components/filter/Beach";
import Cabins from "./components/filter/Cabins";
import useStickyState from "./hooks/useStickyState";

function App() {
  const { searchInput } = useContext(NavContext);
  const [wishlist, setWishlist] = useStickyState([], "wishlist");

  const updateWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((wish) => wish !== id));
    } else {
      setWishlist((prevWishlist) => [...prevWishlist, id]);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/housedetail/:id" element={<HouseDetail />} />
          <Route
            path="/home"
            element={
              <Home updateWishlist={updateWishlist} wishlist={wishlist} />
            }
          />
          <Route
            path="/wishlists"
            element={
              <Wishlist wishlist={wishlist} updateWishlist={updateWishlist} />
            }
          />
          <Route
            path="/Lakefront"
            element={
              <LakeFront updateWishlist={updateWishlist} wishlist={wishlist} />
            }
          />
          <Route
            path="/Beach"
            element={
              <Beach updateWishlist={updateWishlist} wishlist={wishlist} />
            }
          />
          <Route
            path="/Cabins"
            element={
              <Cabins updateWishlist={updateWishlist} wishlist={wishlist} />
            }
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/search-results"
            element={
              <SearchResults
                updateWishlist={updateWishlist}
                wishlist={wishlist}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
