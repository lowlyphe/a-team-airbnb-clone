import React from "react";
import { useContext } from "react";
import HomePreview from "../HomePreview";

//remember to change the path to the NavContext file
import { NavContext } from "./NavContext";

export default function SearchResults({ updateWishlist, wishlist }) {
  const { searchResults, urlArr } = useContext(NavContext);

  //random integer from 0 - 99 to genenrate random picture

  const resultWithUrl = searchResults.map((item, index) => {
    return { ...item, url: urlArr[Math.floor(Math.random() * urlArr.length)] };
  });


  return (
    <div className="flex flex-wrap justify-evenly items-center mx-12">
      {resultWithUrl.map((currentHomes, i) => {
        return (
          <div
            key={currentHomes.id}
            onClick={() => {
              window.open(`/housedetail/${currentHomes.id}`);
            }}
          >
            <HomePreview
              city={currentHomes.city}
              state={currentHomes.state}
              picture={currentHomes.url}
              country={currentHomes.country}
              updateWishlist={updateWishlist}
              wishlist={wishlist}
            />
          </div>
        );
      })}
    </div>
  );
}
