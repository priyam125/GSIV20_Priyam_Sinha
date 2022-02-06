import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { img_300 } from "../util";
import Header from "./Header";

const MovieInfo = () => {
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const [poster, setPoster] = useState();
  const [title, setTitle] = useState("");
  const [extraData, setExtraData] = useState({});
  const [release, setRelease] = useState("");
  const [cast, setCast] = useState([]);
  const [actor1, setActor1] = useState("");
  const [actor2, setActor2] = useState();

  useEffect(() => {
    if (selectedMovie) {
      setTitle(selectedMovie.title || selectedMovie.name);
      setPoster(selectedMovie.poster_path);
    }
    console.log(selectedMovie);
  }, [selectedMovie]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=2bd0ea0352bda7fcda09e90608b34039`
      )
      .then((res) => {
        setExtraData(res.data);
        console.log(res.data);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?api_key=2bd0ea0352bda7fcda09e90608b34039`
      )
      .then((res) => {
        setCast(res.data.cast);
        setActor1(res.data.cast[0].name);
        setActor2(res.data.cast[1].name);

        console.log(res.data.cast);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex md:flex-row flex-col p-4">
        <div className="mb-4">
          <img
            className="rounded-t-xl info-image"
            src={`${img_300}/${poster}`}
            alt="new"
          />
        </div>
        <div className="flex flex-col ml-4">
          <div className="flex text-xl space-x-1">
            <div className="font-bold">{title}</div>
            <div className="text-gray-500">{`(${selectedMovie.vote_average})`}</div>
          </div>
          <div className="flex ">
            <div className="mr-1">{`${extraData.release_date} |`}</div>
            <div>{`${extraData.runtime} mins |`}</div>
          </div>
          <div className="flex">
            <div className="mr-1">{`Cast: `}</div>
            <div>{`${actor1} | `}</div>
            <div className="ml-1">{actor2}</div>
          </div>
          <div className="flex flex-col items-start justify-start mt-4">
            {extraData.tagline && <div className="">{`Tagline: ${extraData.tagline}`}</div>}
            
            <div className="">{`Description: ${extraData.overview}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
