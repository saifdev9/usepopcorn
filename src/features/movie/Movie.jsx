/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { getMovieId } from "./MovieSlice";

function Movie({ movie }) {
  const dispatch = useDispatch();

  function handleClick(id) {
    dispatch(getMovieId(id));
  }

  return (
    <li key={movie.imdbID} onClick={() => handleClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
