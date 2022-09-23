import React, { useEffect } from "react";
import {  useContext } from "react";
import { NavContext } from "../navbar/NavContext";

import HomePreview from "../HomePreview";

export default function LakeFront({ updateWishlist, wishlist }) {
  const { urlArr, filterList } = useContext(NavContext);

  const resultWithUrl = filterList.map((item, index) => {
    return {
      ...item,
      url: urlArr[Math.floor(Math.random() * urlArr.length)],
    };
  });

  return (
    <div className="flex flex-wrap justify-evenly items-center mx-12">
      {resultWithUrl.map((currentHomes, i) => {
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
