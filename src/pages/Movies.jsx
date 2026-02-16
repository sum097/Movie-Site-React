import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(defaultMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch movies from API
  const fetchMovies = async (search) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=4525bdf1&s=${search}`,
      );
      const data = await response.json();
      return data.Search || [];
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  // Handle search
  const handleSearch = async (search = searchTerm) => {
    if (!search.trim()) return;

    setIsLoading(true);
    setDisplayedSearchTerm(search);

    const results = await fetchMovies(search);
    const limitedResults = results.slice(0, 6);

    setMovies(limitedResults);
    setIsLoading(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="main-content">
      <div className="search__nav">
        <div className="movie__input__wrapper">
          <input
            type="text"
            placeholder="Search for a movie"
            className="movie__background__input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="movie__search__wrapper" onClick={() => handleSearch()}>
          <i className="fa-solid fa-magnifying-glass movie__background__search"></i>
        </div>
      </div>
      <section id="movies">
        <div className="container">
          <div className="row">
            <div className="movies__content">
              <div className="movies__list" id="movie__list">
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin movie__list__spinner"></i>
                ) : (
                  movies.map((movie, index) => (
                    <div
                      className="movie"
                      key={index}
                      onClick={() => navigate(`/movies/${movie.imdbID}`)}
                      style={{ cursor: "pointer" }}
                    >
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
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movies;
