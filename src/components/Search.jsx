import { useEffect, useRef, useState } from "react";
import { fetchMovie, getMovieId } from "../features/movie/MovieSlice";
import { useDispatch } from "react-redux";

function Search() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const inputEl = useRef();

  useEffect(() => {
    const abortcontroller = new AbortController();
    try {
      dispatch(fetchMovie({ query, abortcontroller }));
      dispatch(getMovieId(null));
    } catch (error) {
      if (error.name !== "AbortError") {
        return error;
      }
    }

    return () => {
      abortcontroller.abort();
    };
  }, [query, dispatch]);

  useEffect(() => {
    inputEl.current.focus();
    function handleClick(e) {
      if (e.key === "Enter" && document.activeElement !== inputEl.current) {
        // inputEl.current.value = "";
        setQuery("");
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", handleClick);

    return () => {
      document.removeEventListener("keydown", handleClick);
    };
  }, []);

  return (
    <>
      <input
        ref={inputEl}
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}

export default Search;
