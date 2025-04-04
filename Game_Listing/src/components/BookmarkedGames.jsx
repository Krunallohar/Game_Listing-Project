import React, { useEffect, useState } from "react";
import { setBookmarks } from "../redux/bookmarkSlice"; // Adjust path if needed

import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/bookmarkSlice"; // ✅ use what's exported

import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser, SignInButton } from "@clerk/clerk-react";
import "./BookmarkedGames.css";

const BookmarkedGames = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const bookmarks = useSelector((state) => state.bookmark.bookmarkedGames);

  // Load from localStorage on first render
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`bookmarks_${user.id}`);
      if (saved) {
        dispatch(setBookmarks(JSON.parse(saved)));
      }
    }
  }, [user, dispatch]);

  const handleRemove = (id) => {
    dispatch(removeBookmark(id));
  };

  return (
    <div className="bookmarked-container">
      <SignedIn>
        <h1>Bookmarked Games</h1>
        {!bookmarks.length ? (
          <p>No games bookmarked yet.</p>
        ) : (
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
        )}
      </SignedIn>

      <SignedOut>
        <div className="not-signed-in">
          <h1>Bookmarked Games</h1>
          <p>Please sign in to view your bookmarked games.</p>
          <SignInButton />
        </div>
      </SignedOut>
    </div>
  );
};

export default BookmarkedGames;
