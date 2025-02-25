import React, { useEffect, useState, useContext } from "react";
import { NavContext } from "../components/navbar/NavContext";
import axios from "axios";
import HomePreview from "./HomePreview";
// import ScrollButton from "./detail/scrolltop/ScrollButton";
import { v4 } from 'uuid'
// import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

export default function Home({ updateWishlist, wishlist }) {
  const { urlArr } = useContext(NavContext);

  const [currentHomes, setCurrentHomes] = useState([]);

  useEffect(() => {
    axios({
      url: `http://localhost:3010/graphql`,
      method: 'post',
      data: {
        query:` {
                  homes {
                    city
                    state
                    country
                    _id
                  }
                }`
      }
    }).then((res) => {
      for (let i = 0; i < res.data.data.homes.length; i++) {        
        setCurrentHomes((prevCurrentHomes) => [
          ...prevCurrentHomes,
          res.data.data.homes[i],
        ]);
     }
    });
  }, []);



  //Hung: pass id props to HomePreview
  return (
    <div className="flex flex-wrap justify-evenly items-center mx-12">
      {currentHomes.map((currentHomes, i) => {
        return (
          <div
            key={v4()}
            onClick={() => {
              window.open(`/housedetail/${currentHomes._id}`);
            }}
          >
            <HomePreview
              city={currentHomes.city}
              state={currentHomes.state}
              country={currentHomes.country}
              id={currentHomes._id}
              updateWishlist={updateWishlist}
              wishlist={wishlist}
            />
            {/* ADD SCROLLBUTTON IF YOU NEED */}
            {/* <ScrollButton /> */}
          </div>
        );
      })}
    </div>
  );
}
