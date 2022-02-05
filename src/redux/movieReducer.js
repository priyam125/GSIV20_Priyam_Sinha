import { SELECT_MOVIE } from "./movieAction";

const INITIAL_STATE = {
    selectedMovie: null
}


const movieReducer = (state = INITIAL_STATE, action) => {
    // console.log(action.payload);
    switch (action.type) {
      case SELECT_MOVIE: {
        const { selectedMovie } = action.payload;
        return {
          ...state,
          selectedMovie: selectedMovie,
        };
      }
      default:
        return state;
    }
  };
  
  export default movieReducer;