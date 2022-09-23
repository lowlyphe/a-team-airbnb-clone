import React, { useEffect, useState } from "react";
import HouseDetailName from "./HouseDetailName";
import HouseDetailSub from "./HouseDetailSub";
import HouseDetailImages from "./HouseDetailImages";
// import SearchBar from "../navbar/SearchBar";
import HouseDetailDescription from "./HouseDetailDescription";
import HouseDetailMap from "./HouseDetailMap";
import "./detail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Review } from "./Reviews";
import { Price } from "./Price";

const API_URL = process.env.REACT_APP_API_URL;

function HouseDetail() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let { id } = useParams();
  const [houseObject, setHouseObject] = useState({});
  const [house, setHouse] = useState(null);

  useEffect(() => {
    axios({
      url: `http://localhost:3010/graphql`,
      method: 'post',
      data: {
        query:` {
                  house (id: "${id}") {
                    city
                    state
                    country
                    _id
                  }
                }`
      }
    }).then((response) => {
      setHouseObject(response.data.data.house);
    });
  }, []);

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
    }).then((response) => {
      setHouse(response.data.data.homes);
      if (house) {
        setHouseObject(() => house);
      }
    });
  }, []);

  if (!house) return <></>;

  return (
    <div className="house-detail">
      {/* <SearchBar /> */}
      <HouseDetailName house={houseObject} />
      <HouseDetailSub house={houseObject} />
      <HouseDetailImages />
      <div className="house-detail-body">
        <HouseDetailDescription range={range} setRange={setRange} />
        <Price range={range} setRange={setRange} />
      </div>
      <Review />
      <HouseDetailMap />
    </div>
  );
}

export default HouseDetail;
