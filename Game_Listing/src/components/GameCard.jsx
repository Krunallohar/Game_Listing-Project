import React from "react";
import "./GameCard.css";

const GameCard = ({ game }) => {
  if (!game) return null;

  return (
    <div className="game-card">
      {/* 🎮 Game Image */}
      <img
        src={game.background_image || "https://via.placeholder.com/300"}
        alt={game.name || "No Name"}
        className="game-image"
      />

      {/* 📌 Game Details */}
      <div className="game-info">
        <h3 className="game-title">{game.name || "Unknown Game"}</h3>

        {/* 📝 Description (Fallback if missing) */}
        <p className="game-description">
          {game.description_raw
            ? game.description_raw.slice(0, 100) + "..."
            : "No description available."}
        </p>

        {/* 🏷️ Tags */}
        <div className="game-tags">
          <strong>Tags:</strong>{" "}
          {game.tags?.length > 0
            ? game.tags.slice(0, 3).map((tag) => tag.name).join(", ")
            : "No Tags"}
        </div>

        {/* 🎮 Category (Genres) */}
        <div className="game-category">
          <strong>Category:</strong>{" "}
          {game.genres?.length > 0
            ? game.genres.map((genre) => genre.name).join(", ")
            : "Unknown"}
        </div>

        {/* ⭐ Ratings */}
        <div className="game-rating">
          <strong>Ratings:</strong> {game.rating !== undefined ? game.rating : "N/A"} / 5
        </div>
      </div>
    </div>
  );
};

export default GameCard;
