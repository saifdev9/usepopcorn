import { useSelector } from "react-redux";
import Movie from "./Movie";

function MoviesList() {
  const { movies, error, loading } = useSelector((state) => state.movies);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default MoviesList;
