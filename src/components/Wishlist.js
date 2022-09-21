import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import heartFull from "../assets/heart-full.png";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export default function Wishlist({ wishlist, updateWishlist }) {
  const [p, setp] = useState([]);
  useEffect(() => {
    axios.post(`${API_URL}/api/wishlist`, {
      idList: wishlist
    }).then((res) => {
        for (let i of res.data) {
          setp((prevp) => [...prevp, res.data]);
        }
        
      });
  }, []);

  const removeFromWishList = (id) => {
    setp((current) =>
      current.filter((list) => {
        return list.id !== id;
      })
    );
    updateWishlist(id);
  };

  return (
    <div className="px-20">
      <h1 className="font-bold flex text-4xl ">Wishlist</h1>
      {p.map((i) => {
        const randomPic = faker.image.business(600, 600, true);
        const randomRating = (Math.random() * 5).toFixed(2);
        const miles = (Math.random() * 100).toFixed(0);
        const price = (Math.random() * 1000).toFixed(0);
        return (
          <div
            key={i.id}
            className="relative mx-1 my-4 flex flex-col items-start w-72"
          >
            <img
              className="w-70 rounded-lg home-img"
              src={randomPic}
              alt="img"
            />
            <div className="flex justify-between items-center w-full mt-2">
              <p className="font-semibold text-sm truncate">
                {i.city}, {i.state}, {i.country},
              </p>
              <p>&#9733;{randomRating} </p>
            </div>
            <p className="text-gray-500">{miles} miles</p>
            <p className="text-gray-500">Oct 3-8</p>
            <span className="flex">
              <p className="font-semibold">${price}&nbsp;</p>
              <p>night</p>
            </span>
            <button
              onClick={() => {
                removeFromWishList(i.id);
              }}
            >
              <img
                className="absolute top-4 right-4 w-6 h-6"
                src={heartFull}
                alt={""}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
