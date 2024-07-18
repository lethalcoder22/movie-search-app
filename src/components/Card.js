import React from "react";
import "./Card.css";

function Card({ movie }) {
  return (
    <div className="card">
      <img src={movie.dogImage} alt="Random Dog" />
      <h2>{movie.title}</h2>
      <p>{movie.author}</p>
      <p>{movie.publishYear}</p>
    </div>
  );
}

export default Card;
