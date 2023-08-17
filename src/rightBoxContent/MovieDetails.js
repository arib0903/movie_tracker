import React, { useState, useEffect } from "react";
import StarRating from "../StarRating";
import LoadingScreen from "../loadingPage/LoadingScreen";

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  // const [watched, setWatched] = useState(false);
  const KEY = "362b1231";

  let watched = watchedMovies.some((movie) => movie.imdbID === selectedId);
  let watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newMovie = {
      Title: movie.Title,
      imdbID: selectedId,
      Poster: movie.Poster,
      Year: movie.Year,
      Runtime: Number(movie.Runtime.split(" ")[0]),
      imdbRating: Number(movie.imdbRating),
      userRating,
    };

    onAddWatched(newMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}&plot=full`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);

        // console.log(movie.Ratings);

        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt="" />

            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <h4>{movie.Type}</h4>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
              <p>
                <span>⭐️</span> Language: {movie.Language}
              </p>
            </div>
          </header>

          <section>
            <a
              href={`https://www.google.com/search?q=${movie.Title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-add">Watch Movie</button>
            </a>
            <div className="rating">
              {!watched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  ></StarRating>
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + add to list
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>Already watched and Rated {watchedUserRating}</p>
              )}
            </div>

            <p>
              <b>{movie.Plot}</b>
            </p>
            <p>
              Starring: <em>{movie.Actors}</em>
            </p>
            <p>
              Directed by: <em>{movie.Director}</em>
            </p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
