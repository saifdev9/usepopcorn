/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // WatchedMovies: [],
  WatchedMovies: JSON.parse(localStorage.getItem("movies")) || [],
};

const WatchedSlice = createSlice({
  name: "WatchedMovies",
  initialState,
  reducers: {
    addToWatch(state, action) {
      state.WatchedMovies.push(action.payload);
      localStorage.setItem("movies", JSON.stringify(state.WatchedMovies));
    },
    removeFromWatch(state, action) {
      state.WatchedMovies = state.WatchedMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
      localStorage.setItem(
        "movies",
        JSON.stringify(
          state.WatchedMovies.filter((movie) => movie.imdbID !== action.payload)
        )
      );
    },
  },
});

export const { addToWatch, removeFromWatch } = WatchedSlice.actions;

export default WatchedSlice.reducer;

export const getAlreadyAdded = (id) => (state) =>
  state.watched.WatchedMovies.find((movie) => movie.imdbID === id)?.userRating;
