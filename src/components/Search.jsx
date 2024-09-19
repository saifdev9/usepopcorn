import { useEffect, useState } from "react";
import { fetchMovie } from "../features/movie/MovieSlice";
import { useDispatch } from "react-redux";

function Search() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const abortcontroller = new AbortController();
    try {
      dispatch(fetchMovie({ query, abortcontroller }));
    } catch (error) {
      if (error.name !== "AbortError") {
        return error;
      }
    }

    return () => {
      abortcontroller.abort();
    };
  }, [query, dispatch]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
