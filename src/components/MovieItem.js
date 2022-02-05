import React from "react";
import { img_300 } from "../util";

const MovieItem = ({key, id, poster, title, vote_average, overview}) => {
  return (
    <div className="flex flex-col movie shadow-lg rounded-xl border p-8">
    <img src={`${img_300}/${poster}`} alt = 'new'/>
      <div className='flex justify-between items-center'>
        <div className="relative">
            <div className="">{title}</div>
        </div>
        <div>{vote_average}</div>
      </div>
    </div>
  );
};

export default MovieItem;
