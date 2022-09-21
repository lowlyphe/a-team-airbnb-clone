import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NavContext = createContext();

const API_URL = process.env.REACT_APP_API_URL

export default function NavContextProvider({ children }) {
  //**Inout search bar state */
  const [searchInput, setSearchInput] = useState("");
  const onChangeInput = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  //**Get lorem picture */
  const [loremPic, setLoremPic] = useState([]);
  useEffect(() => {
    axios.get("https://picsum.photos/v2/list?page=3&limit=100").then((res) => {
      setLoremPic(res.data);
    });
  }, []);
  // console.log(loremPic);
  const urlArr = loremPic.map((item) => item.download_url);
  // console.log(urlArr);

  //**Get homes by country (search results) */
  const [searchResults, setSearchResults] = useState([]);
  const getHomesByCountry = async (input) => {
    try {
      const response = await axios.get(`${API_URL}/api/homes/country/${input}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //**CurrentHome state */
  const [currentHomesData, setCurrentHomesData] = useState();
  const handleClick = (id) => {
    setCurrentHomesData(id);
  };
  localStorage.setItem("currentHomesDataID", JSON.stringify(currentHomesData));

  //**Get homes by filter (Lakefront, Cabins, Beach) */
  const [filterList, setFilterList] = useState([]);
  const getFilterHome = async (input) => {
    try {
      const response = await axios.get(`${API_URL}/api/homes/type/${input}`);
      setFilterList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(currentHomesData);

  const navContextData = {
    searchInput,
    onChangeInput,
    getHomesByCountry,
    searchResults,
    urlArr,
    currentHomesData,
    setCurrentHomesData,
    handleClick,
    filterList,
    getFilterHome
  };

  return (
    <NavContext.Provider value={navContextData}>{children}</NavContext.Provider>
  );
}
