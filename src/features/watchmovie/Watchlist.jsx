import { useSelector } from "react-redux";
import WatchMovie from "./WatchMovie";

function Watchlist() {
  const { WatchedMovies: watched } = useSelector((state) => state.watched);

  return (
    <ul className="list">
      {watched.map((movie, i) => (
        <WatchMovie movie={movie} key={i} />
      ))}
    </ul>
  );
}

export default Watchlist;
