import { useSelector } from "react-redux";
import Movie from "./Movie";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

function MoviesList() {
  const { movies, error, loading } = useSelector((state) => state.movies);

  if (loading) return <Loading />;
  if (error) return <Error>{error}</Error>;

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default MoviesList;
