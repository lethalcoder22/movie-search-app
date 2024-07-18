import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);
    setMovies([]);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await response.json();
      const moviesData = await Promise.all(
        data.docs.map(async (movie) => {
          const dogImageResponse = await fetch(
            "https://dog.ceo/api/breeds/image/random"
          );
          const dogImageData = await dogImageResponse.json();
          return {
            title: movie.title,
            author: movie.author_name
              ? movie.author_name.join(", ")
              : "Unknown Author",
            publishYear: movie.first_publish_year,
            dogImage: dogImageData.message,
          };
        })
      );
      setMovies(moviesData);
    } catch (error) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={fetchMovies} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="card-container">
        {movies.map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
