import { useSelector } from "react-redux";
import Search from "./Search";

function Navbar() {
  const { movies } = useSelector((state) => state.movies);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <Search />
      <p className="num-results">
        Found <strong>{movies?.length ?? 0}</strong> results
      </p>
    </nav>
  );
}

export default Navbar;
