import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movie/MovieSlice";
import watchedReducer from "./features/watchmovie/WatchedSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    watched: watchedReducer,
  },
});
export default store;
