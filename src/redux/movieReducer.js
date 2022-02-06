import { SELECT_MOVIE, SET_TRENDING_DATA } from "./movieAction";

const INITIAL_STATE = {
    selectedMovie: null,
    trendingData: null
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
      case SET_TRENDING_DATA: {
        const {trendingData} = action.payload
        return {
          ...state,
          trendingData: trendingData
        }
      }
      default:
        return state;
    }
  };
  
  export default movieReducer;