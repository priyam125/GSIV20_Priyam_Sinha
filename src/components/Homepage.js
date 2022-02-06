import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import {AiOutlineSearch} from 'react-icons/ai'
import { useDispatch } from "react-redux";
import { SELECT_MOVIE } from "../redux/movieAction";

const Homepage = () => {
  const [trendingData, setTrendingData] = useState(null);
  const [searchText, setSearchText] = useState('');

  const dispatcher = useDispatch()

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
        setTrendingData(res.data);
        setSearchText('')
        console.log(res.data);
        console.log(res.data.results);
      });

      dispatcher({
          type: SELECT_MOVIE,
          payload: {selectedMovie: null}
      })

  }, []);

  const handleSearch = () => {
      console.log(searchText);

      axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=2bd0ea0352bda7fcda09e90608b34039&query=${searchText}`
      ).then((res) => {
          console.log(res.data.results);
          setTrendingData(res.data)
          setSearchText('')
      })
  }

  return (
    <div className="w-screen h-screen px-4 ml-8">
      <div className="flex mb-4 h-8 items-center">
        <AiOutlineSearch className="h-6 w-6 cursor-pointer outline-none" onClick={handleSearch}/>
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search" className="bg-gray-300 w-1/6 rounded px-2"></input>
      </div> 
      <div className="flex flex-wrap">
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
