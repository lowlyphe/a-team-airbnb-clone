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
    axios.get(`${API_URL}/api/homes/${id}`).then((response) => {
      setHouseObject(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/homes`).then((response) => {
      // console.log("House data:", response.data);
      setHouse(response.data);
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
