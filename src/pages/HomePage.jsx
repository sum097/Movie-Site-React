import React, { useState, useEffect } from "react";
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

const HomePage = () => {
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

    // Navigate to Movies page with search term
    navigate(`/movies?search=${encodeURIComponent(search)}`);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="main-content">
      <section id="header">
        <div className="movie__background">
          <div className="movie__background__wrapper">
            <img
              src="/assets/moviebackground2.jpg"
              className="movie__background__image"
            />
          </div>
          <div className="movie__background__text">
            <h1 className="movie__background__title">
              Ticket <span className="span__title">+</span>
            </h1>
            <h3 className="movie__background__para">
              With over <span className="span__title2">3000</span> movies on
              ticket
              <span className="span__title2">+</span>, the possibilities are
              endless!
            </h3>
            <div className="movie__input">
              <div className="movie__input__wrapper">
                <input
                  type="text"
                  placeholder="Find a movie"
                  className="movie__background__input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <i
                  className="fa-solid fa-magnifying-glass movie__background__search"
                  onClick={() => handleSearch()}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="movies">
        <div className="container">
          <div className="row">
            <div className="movies__content">
              {displayedSearchTerm && (
                <div className="movies__searchbar">
                  <h2 className="movies__title__top">Search results for:</h2>
                  <h2 className="movies__search__result">
                    "{displayedSearchTerm}"
                  </h2>
                </div>
              )}
              <div className="movies__list" id="movie__list">
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin movie__list__spinner"></i>
                ) : (
                  movies.map((movie, index) => (
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

export default HomePage;
