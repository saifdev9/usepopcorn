import { useDispatch } from "react-redux";
import { removeFromWatch } from "./WatchedSlice";

/* eslint-disable react/prop-types */
function WatchMovie({ movie }) {
  const dispatch = useDispatch();
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          onClick={() => dispatch(removeFromWatch(movie?.imdbID))}
          className="btn-delete"
        >
          X
        </button>
      </div>
    </li>
  );
}

export default WatchMovie;
