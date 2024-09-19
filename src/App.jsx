import Navbar from "./components/Navbar";
import Box from "./components/Box";
import MoviesList from "./features/movie/MoviesList";
import Summary from "./features/watchmovie/Summary";
import Watchlist from "./features/watchmovie/Watchlist";
import Main from "./components/Main";

export default function App() {
  return (
    <>
      <Navbar />
      <Main>
        <Box>
          <MoviesList />
          {/* <List
            data={movies}
            render={(movie) => <Movie movie={movie} key={movie.imdbID} />} 
          />*/}
        </Box>

        <Box>
          <Summary />
          <Watchlist />
          {/* <List
            data={watched}
            render={(movie) => <WatchMovie movie={movie} key={movie.imdbID} />}
          /> */}
        </Box>
      </Main>
    </>
  );
}
