import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { img_300 } from '../util';

const MovieInfo = () => {

    const selectedMovie = useSelector((state) => console.log(state.movie.selectedMovie))
    const [poster, setPoster] = useState();
    const [title, setTitle] = useState('');

    useEffect(() => {
        if(selectedMovie) {
           setTitle(selectedMovie.title || selectedMovie.name)
        } else {
            setTitle('none')
        }
    },[selectedMovie])

    useEffect(() => {
        console.log(selectedMovie);
    },[selectedMovie])


  return (
      <div className='flex'>
      {title}
      </div>
      );
};

export default MovieInfo;
