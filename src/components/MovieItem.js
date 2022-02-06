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
        className="flex flex-col movie shadow-lg rounded-xl border mr-6 mb-4 cursor-pointer "
      >
        <img className="rounded-t-xl" src={`${img_300}/${poster}`} alt="new" />
        <div className="flex justify-between items-center my-1 relative">
          <div className=" ml-1 w-2/3 overflow-ellipsis whitespace-nowrap title text-xs font-bold">
            <span className="">{title}</span>
          </div>
          <div className="mr-1 z-20 font-bold">{vote_average}</div>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
