import React, {useState, useEffect} from "react";
import axios from "axios";

import {AiOutlineSearch, AiFillHome} from 'react-icons/ai'
import { useDispatch } from "react-redux";
import { SET_TRENDING_DATA } from "../redux/movieAction";

const Header = () => {

    const [searchText, setSearchText] = useState("");
    const dispatcher = useDispatch();

    useEffect(() => {
        handleSearch();
      }, [searchText]);

    const handleSearch = () => {
        console.log(searchText);
    
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=2bd0ea0352bda7fcda09e90608b34039&query=${searchText}`
          )
          .then((res) => {
            console.log(res.data.results);
            dispatcher({
                type: SET_TRENDING_DATA,
                payload: {trendingData: res.data}
              })
            // setSearchText("");
          });
      };

      const handleRefresh = () => {
        axios
            .get(
              "https://api.themoviedb.org/3/trending/movie/day?api_key=2bd0ea0352bda7fcda09e90608b34039"
            )
            .then((res) => {
              dispatcher({
                type: SET_TRENDING_DATA,
                payload: {trendingData: res.data}
              })
              setSearchText("");
              console.log(res.data);
              console.log(res.data.results);
            });
      }


  return (
    <div className="flex mb-4 h-12 items-center justify-between border-b-2 px-6 shadow-md">
        <div className="flex items-center">
          <AiOutlineSearch
            className="h-8 w-12 cursor-pointer outline-none"
            onClick={handleSearch}
          />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="bg-gray-300 md:w-80 w-48 rounded px-2 py-1"
          ></input>
        </div>
        <div onClick={handleRefresh} className="mr-6"><AiFillHome /></div>
      </div>
  );
};

export default Header;
