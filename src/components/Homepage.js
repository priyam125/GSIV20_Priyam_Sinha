import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { AiOutlineSearch, AiFillHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_MOVIE, SET_TRENDING_DATA } from "../redux/movieAction";
import Header from "./Header";

const Homepage = () => {
  // const [trendingData, setTrendingData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const trendingData = useSelector((state) => state.movie.trendingData);

  const dispatcher = useDispatch();

  useEffect(() => {
    // axios
    //   .get(
    //     `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });

    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=2bd0ea0352bda7fcda09e90608b34039"
      )
      .then((res) => {
        // setTrendingData(res.data);
        dispatcher({
          type: SET_TRENDING_DATA,
          payload: { trendingData: res.data },
        });
        setSearchText("");
        console.log(res.data);
        console.log(res.data.results);
      });

    dispatcher({
      type: SELECT_MOVIE,
      payload: { selectedMovie: null },
    });

    console.log(trendingData);
  }, []);

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
          payload: { trendingData: res.data },
        });
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
          payload: { trendingData: res.data },
        });
        setSearchText("");
        console.log(res.data);
        console.log(res.data.results);
      });
  };

  return (
    <div className="w-screen h-screen overflow-x-clip">
      {/*<div className="flex mb-4 h-12 items-center justify-between border-b-2 px-6 shadow-md">
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
  </div>*/}
      <Header />
      <div className="flex flex-wrap justify-evenly px-4">
        {trendingData &&
          trendingData.results.map((data, index) => {
            return (
              <MovieItem
                className=""
                data={data}
                key={data.id}
                id={data.id}
                poster={data.poster_path}
                title={data.title || data.name}
                vote_average={data.vote_average}
                overview={data.overview}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Homepage;
