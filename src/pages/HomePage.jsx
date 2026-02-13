import React, { useState, useEffect } from "react";

const defaultMovies = [
  {
    Title: "Guardians of the Galaxy Vol. 2",
    Poster: "/assets/movie1.jpg", // ← Added leading /
    Year: "136m",
    Type: "4.5",
    Language: "English",
  },
  {
    Title: "The Avengers",
    Poster: "/assets/movie2.jpg", // ← Added leading /
    Year: "136m",
    Type: "4.5",
    Language: "English",
  },
  {
    Title: "Spider-man: Homecoming",
    Poster: "/assets/movie3.jpg", // ← Added leading /
    Year: "136m",
    Type: "4.5",
    Language: "English",
  },
  {
    Title: "Minions: Rise of Gru",
    Poster: "/assets/movie4.jpg", // ← Added leading /
    Year: "136m",
    Type: "4.5",
    Language: "English",
  },
  {
    Title: "Spider-Man: Into the Spider-Verse",
    Poster: "/assets/movie5.jpg", // ← Added leading /
    Year: "136m",
    Type: "4.5",
    Language: "English",
  },
  {
    Title: "Nope",
    Poster: "/assets/movie6.jpg", // ← Added leading /
    Year: "136m",
    Type: "4.5",
    Language: "English",
  },
];

const HomePage = () => {
  const [movies, setMovies] = useState(defaultMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [navSearchActive, setNavSearchActive] = useState(false);

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

  // Handle nav search
  const handleNavKeyPress = (e, navSearch) => {
    if (e.key === "Enter" && navSearch.trim()) {
      setSearchTerm(navSearch);
      handleSearch(navSearch);
      setNavSearchActive(false);
    }
  };

  return (
    <>
      <section id="header">
        <div className="movie__background">
          <div className="movie__background__wrapper">
            <div className="movie__nav">
              <div className="nav__left">
                <figure className="nav__logo">
                  <img
                    src="/assets/movielogo.png"
                    alt=""
                    className="nav__image"
                  />
                </figure>
                <a href="#" className="nav__link">
                  Home
                </a>
                <a href="#" className="nav__link">
                  Contact
                </a>
              </div>
              <div className="nav__right">
                <div className="nav__input__wrapper">
                  <input
                    type="text"
                    placeholder="Find a movie"
                    className={`nav__input__text ${navSearchActive ? "active" : ""}`}
                    onKeyPress={(e) => handleNavKeyPress(e, e.target.value)}
                  />
                  <i
                    className={`fa-solid fa-magnifying-glass nav__search ${navSearchActive ? "active" : ""}`}
                    onClick={() => setNavSearchActive(!navSearchActive)}
                  ></i>
                </div>
                <i className="fa-solid fa-gear nav__settings"></i>
              </div>
            </div>
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
              <div className="movies__searchbar">
                <h2 className="movies__title__top">Search results for:</h2>
                <h2 className="movies__search__result">
                  "{displayedSearchTerm}"
                </h2>
              </div>
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
                        <div className="movie__info__list">
                          <div className="movie__info movie__info1">
                            <i className="fa-solid fa-clock movie__info__icon"></i>
                            <p className="movie__info__text">{movie.Year}</p>
                          </div>
                          <div className="movie__info movie__info2">
                            <i className="fa-solid fa-star movie__info__icon"></i>
                            <p className="movie__info__text">{movie.Type}</p>
                          </div>
                          <div className="movie__info movie__info3">
                            <i className="fa-solid fa-earth-americas movie__info__icon"></i>
                            <p className="movie__info__text">
                              {movie.Language}
                            </p>
                          </div>
                        </div>
                      </figure>
                      <h4 className="movie__title">{movie.Title}</h4>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
