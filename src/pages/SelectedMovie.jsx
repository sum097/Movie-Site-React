import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const defaultMovies = [
  {
    Title: "Guardians of the Galaxy Vol. 2",
    Poster: "/assets/movie1.jpg",
    Year: "136m",
    Type: "4.5",
    Language: "English",
    imdbID: "tt3896198",
  },
  {
    Title: "The Avengers",
    Poster: "/assets/movie2.jpg",
    Year: "136m",
    Type: "4.5",
    Language: "English",
    imdbID: "tt0848228",
  },
  {
    Title: "Spider-man: Homecoming",
    Poster: "/assets/movie3.jpg",
    Year: "136m",
    Type: "4.5",
    Language: "English",
    imdbID: "tt2250912",
  },
  {
    Title: "Minions: Rise of Gru",
    Poster: "/assets/movie4.jpg",
    Year: "136m",
    Type: "4.5",
    Language: "English",
    imdbID: "tt5113044",
  },
  {
    Title: "Spider-Man: Into the Spider-Verse",
    Poster: "/assets/movie5.jpg",
    Year: "136m",
    Type: "4.5",
    Language: "English",
    imdbID: "tt4633694",
  },
  {
    Title: "Nope",
    Poster: "/assets/movie6.jpg",
    Year: "136m",
    Type: "4.5",
    Language: "English",
    imdbID: "tt10954984",
  },
];

const SelectedMovie = () => {
  const navigate = useNavigate();
  const { imdbID } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [imdbID]);

  async function fetchMovie() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=4525bdf1&i=${imdbID}`,
      );

      setSelectedMovie(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="main-content">
        <div style={{ color: "white", textAlign: "center", padding: "100px" }}>
          <i
            className="fa-solid fa-spinner fa-spin"
            style={{ fontSize: "48px" }}
          ></i>
        </div>
      </div>
    );
  }

  if (!selectedMovie || selectedMovie.Response === "False") {
    return (
      <div className="main-content">
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "100px",
            fontSize: "24px",
          }}
        >
          Movie not found
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-content">
        <div className="selected-movie">
          <div className="selected-movie__container">
            <div className="selected-movie__left">
              <figure className="selected-movie__img__wrapper">
                <img
                  src={
                    selectedMovie.Poster !== "N/A"
                      ? selectedMovie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={selectedMovie.Title}
                  className="selected-movie__img"
                />
              </figure>
            </div>
            <div className="selected-movie__right">
              <h1 className="selected-movie__title">{selectedMovie.Title}</h1>
              <div className="selected-movie__meta">
                <span className="">{selectedMovie.Year}</span>
                <span className=""> • </span>
                <span className="">
                  {selectedMovie.Runtime}
                </span>
                <span className=""> • </span>
                <span className="">
                  {selectedMovie.imdbRating !== "N/A"
                    ? selectedMovie.imdbRating
                    : "N/A"}
                  /10
                </span>
              </div>

              <div className="selected-movie__overview">
                <h2 className="selected-movie__overview-title">Overview</h2>
                <p className="selected-movie__plot">
                  {selectedMovie.Plot !== "N/A"
                    ? selectedMovie.Plot
                    : "No plot available."}
                </p>
              </div>
              <div className="selected-movie__actions">
                <button className="selected-movie__btn selected-movie__btn--primary">
                  <i className="fa-solid fa-play"></i>
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="recommended-movies-section">
        <h2 className="recommended-movies-title">Recommended Movies</h2>
      </div>

      <div className="movies__list" id="movie__list">
        {defaultMovies.map((movie, index) => (
          <div className="movie" key={index}>
            <figure className="movie__image__wrapper">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie__image"
              />
              <h3 className="movie__info__title">{movie.Title}</h3>
              <button
                key={index}
                onClick={() => navigate(`/movies/${movie.imdbID}`)}
                style={{ cursor: "pointer" }}
                className="movie__button"
              >
                Find Out More
              </button>
            </figure>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectedMovie;