import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { AiOutlineSearch, AiFillHome } from "react-icons/ai";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_MOVIE, SET_TRENDING_DATA } from "../redux/movieAction";
import Header from "./Header";

const Homepage = () => {
  const trendingData = useSelector((state) => state.movie.trendingData);
  const [page, setPage] = useState(1);

  const dispatcher = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=2bd0ea0352bda7fcda09e90608b34039&page=${page}`
      )
      .then((res) => {
        // setTrendingData(res.data);
        dispatcher({
          type: SET_TRENDING_DATA,
          payload: { trendingData: res.data },
        });
        // setSearchText("");
        // console.log(res.data);
        // console.log(res.data.results);
      });

    dispatcher({
      type: SELECT_MOVIE,
      payload: { selectedMovie: null },
    });
  }, [page]);

  const handleNext = () => {
    setPage((prevState) => prevState + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1);
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-clip">
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
      <div className="flex items-center justify-center space-x-4">
        <BiSkipPreviousCircle
          onClick={handlePrevious}
          className="h-8 w-8 cursor-pointer"
        />
        <div className="font-semibold">{`Page: ${page}`}</div>
        <BiSkipNextCircle
          onClick={handleNext}
          className="h-8 w-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Homepage;
