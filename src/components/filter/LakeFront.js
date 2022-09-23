import React, { useEffect } from "react";
import {  useContext } from "react";
import { NavContext } from "../navbar/NavContext";

import HomePreview from "../HomePreview";

export default function LakeFront({ updateWishlist, wishlist }) {
  const { filterList } = useContext(NavContext);



  return (
    <div className="flex flex-wrap justify-evenly items-center mx-12">
      {filterList.map((currentHomes, i) => {
        return (
          <div
            key={currentHomes._id}
            onClick={() => {
              window.open(`/housedetail/${currentHomes._id}`);
            }}
          >
            <HomePreview
              city={currentHomes.city}
              state={currentHomes.state}
              picture={currentHomes.url}
              country={currentHomes.country}
              id={currentHomes._id}
              updateWishlist={updateWishlist}
              wishlist={wishlist}
            />
          </div>
        );
      })}
    </div>
  );
}
