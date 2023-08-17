import React, { useState, useEffect } from "react";
import NavBar from "./navBarContent/NavBar";
import Logo from "./navBarContent/Logo";
import Search from "./navBarContent/Search";
import NumResults from "./navBarContent/NumResults";

import Main from "./mainContent/Main";
import BoxComp from "./mainContent/BoxComp";

import MovieList from "./boxCompContent/MovieList";

import MovieDetails from "./rightBoxContent/MovieDetails";
import WatchedSummary from "./rightBoxContent/WatchedSummary";
import WatchedMoviesList from "./rightBoxContent/WatchedMoviesList";

import LoadingScreen from "./loadingPage/LoadingScreen";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const KEY = "362b1231";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    // setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res || !res.ok)
            throw new Error("Failed to fetch movies!Try again!");

          const data = await res.json();

          if (data.Response === "False") throw new Error("movie not found!");

          let newData = data.Search.sort((a, b) => +b.Year - +a.Year);
          setMovies(newData);
          setError("");
        } catch (err) {
          console.log(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
        setMovies(tempMovieData);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    // <PassMovie.Provider value={movies}>
    <>
      <NavBar movies={movies}>
        <Logo />
        <Search query={query} setQuery={setQuery} />

        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <BoxComp>
          {isLoading && <LoadingScreen />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </BoxComp>

        <BoxComp>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleRemoveWatched}
              />
            </>
          )}
        </BoxComp>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <div className="error">{message}</div>;
}
