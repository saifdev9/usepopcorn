/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  loading: false,
  error: "",
  movie: {},
  currMovieId: null,
};

export const fetchMovie = createAsyncThunk(
  "fetchMovie",
  async ({ query, abortcontroller }) => {
    if (query && query?.length >= 3) {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=237c39d7&s=${query}`,
          {
            signal: abortcontroller.signal,
          }
        );

        const data = await res.json();

        if (data.Response === "False") {
          return new Promise((resolve, reject) => {
            reject(data.Error);
          });
          // return data.Error;
          // throw new Error(data.Error);
        }

        return data?.Search;
      } catch (err) {
        if (err.name !== "AbortError") {
          return err;
        }
      }
    }
  }
);

const MovieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovieId(state, action) {
      state.currMovieId =
        action.payload === state.currMovieId ? null : action.payload;
    },
    getMovieDetails(state, action) {
      state.movie = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
        state.movies = [];
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.movies = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.movies = [];
        state.error = "Movie Not Found!";
      }),
});

export const { getMovieDetails, getMovieId } = MovieSlice.actions;

export default MovieSlice.reducer;
