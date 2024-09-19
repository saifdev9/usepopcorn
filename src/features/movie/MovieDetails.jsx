import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails, getMovieId } from "./MovieSlice";
import Loading from "../../components/Loading";
import Star from "../../components/Star";
import { addToWatch, getAlreadyAdded } from "../watchmovie/WatchedSlice";

function MovieDetails() {
  const { currMovieId, movie } = useSelector((state) => state.movies);
  const ratedByUser = useSelector(getAlreadyAdded(currMovieId));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState();

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=237c39d7&i=${currMovieId}`
      );
      const data = await res.json();
      dispatch(getMovieDetails(data));
      setLoading(false);
    }
    fetchDetails();
  }, [currMovieId, dispatch]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `MOVIE | ${movie.Title}`;

    return () => {
      document.title = "🍿usePopcorn";
    };
  }, [movie.Title]);

  useEffect(() => {
    function handleClick(e) {
      if (e.key === "Escape") dispatch(getMovieId(null));
    }
    document.addEventListener("keydown", handleClick);

    return () => {
      document.removeEventListener("keydown", handleClick);
    };
  }, [dispatch]);

  function handlAddWatch() {
    const newMovie = {
      imdbID: currMovieId,
      Title: movie?.Title,
      Year: movie?.Year,
      Poster: movie?.Poster,
      runtime: +movie?.Runtime.split(" ")?.at(0),
      imdbRating: +movie?.imdbRating,
      userRating: userRating,
    };
    dispatch(addToWatch(newMovie));
    dispatch(getMovieId(null));
  }

  return (
    <div className="details">
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={() => dispatch(getMovieId(null))}
            >
              &larr;
            </button>
            <img src={movie?.Poster} alt={`Poster of ${movie?.Title} movie`} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {ratedByUser ? (
                <p>You rated this movie {ratedByUser} 🌟.</p>
              ) : (
                <>
                  <Star onSetRating={setUserRating} />
                  {userRating && (
                    <button onClick={handlAddWatch} className="btn-add">
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
