import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";

const Homepage = () => {
  const [trendingData, setTrendingData] = useState(null);

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
        "https://api.themoviedb.org/3/trending/all/day?api_key=2bd0ea0352bda7fcda09e90608b34039"
      )
      .then((res) => {
        setTrendingData(res.data);
        console.log(res.data);
        console.log(res.data.results);
      });
  }, []);

  return (
    <div className="w-screen h-screen px-4">
      <div className="grid grid-cols-5 gap-y-8">
        {trendingData &&
          trendingData.results.map((data) => {
            return (
              <MovieItem
                className=""
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
