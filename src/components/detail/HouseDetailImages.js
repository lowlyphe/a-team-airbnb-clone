import axios from "axios";

import React, { useState, useEffect } from "react";

const HouseDetailImages = ({}) => {
  const [housePictures, setHousePictures] = useState([]);
  let randomArr = [];

  // let randomArr = housePictures.map(pictures => {
  //   [...pictures, (Math.random()*100).toFixed(0)]
  // })

  for (let i = 0; i < 5; i++) {
    randomArr.push((Math.random() * 100).toFixed());
  }
  useEffect(() => {
    axios.get("https://picsum.photos/v2/list?page=3&limit=100").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        setHousePictures((prevHousePictures) => [
          ...prevHousePictures,
          res.data[i].download_url,
        ]);
      }
    });
  }, []);

  let randomIndex = Math.floor(Math.random() * housePictures.length);
  return (
    <div className="flex space-x-2 w-full h-full">
      <div className="house-detail-image-left w-full h-24">
        <img src={housePictures[randomIndex]} alt="houseDetail" />
      </div>
      <div className="house-detail-image-right flex flex-wrap">
        <img
          className="h-24"
          src={housePictures[randomIndex + 1]}
          alt="houseDetail"
        />
        <img
          className="h-24"
          src={housePictures[randomIndex + 2]}
          alt="houseDetail"
        />
        <img
          className="h-24"
          src={housePictures[randomIndex + 3]}
          alt="houseDetail"
        />
        <img
          className="h-24"
          src={housePictures[randomIndex + 4]}
          alt="houseDetail"
        />
      </div>
    </div>
  );
};

export default HouseDetailImages;
