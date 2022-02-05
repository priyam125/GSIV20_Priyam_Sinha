import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SELECT_MOVIE } from "../redux/movieAction";
import { img_300 } from "../util";

const MovieItem = ({ id, poster, title, vote_average, overview, data }) => {
  const dispatcher = useDispatch();

  const handleClick = () => {
    dispatcher({
      type: SELECT_MOVIE,
      payload: { selectedMovie: data },
    });
  };

  return (
    <Link to='/info'>
      <div
        onClick={handleClick}
        className="flex flex-col movie shadow-lg rounded-xl border mr-6 mb-4 cursor-pointer"
      >
        <img className="rounded-t-xl" src={`${img_300}/${poster}`} alt="new" />
        <div className="flex justify-between items-center mt-1">
          <div className="relative ml-1">
            <div className="">{title}</div>
          </div>
          <div className="mr-1">{vote_average}</div>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
