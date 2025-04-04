// src/components/BookmarkedGames.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmark } from "../redux/bookmarkSlice";
import { useNavigate } from "react-router-dom";
import "./BookmarkedGames.css";

const BookmarkedGames = () => {
  const bookmarks = useSelector((state) => state.bookmark.bookmarkedGames);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeBookmark(id));
  };

  if (!bookmarks.length) {
    return (
      <div className="bookmarked-container">
        <h1>Bookmarked Games</h1>
        <p>No games bookmarked yet.</p>
      </div>
    );
  }

  return (
    <div className="bookmarked-container">
      <h1>Bookmarked Games</h1>
      <div className="bookmarked-grid">
        {bookmarks.map((game) => (
          <div key={game.id} className="bookmark-card">
            <img
              src={game.background_image}
              alt={game.name}
              onClick={() => navigate(`/game/${game.id}`)}
              className="bookmark-img"
            />
            <div className="bookmark-content">
              <h2>{game.name}</h2>
              <p>⭐ {game.rating} | 📅 {game.released}</p>
              <button className="remove-btn" onClick={() => handleRemove(game.id)}>
                Remove from Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedGames;
