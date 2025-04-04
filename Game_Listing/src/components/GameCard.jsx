import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/bookmarkSlice";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import "./GameCard.css";

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useUser();

  const bookmarks = useSelector((state) => state.bookmark.bookmarkedGames);
  const isBookmarked = bookmarks.some((item) => item.id === game.id);

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    if (isBookmarked) {
      dispatch(removeBookmark(game.id));
    } else {
      dispatch(addBookmark(game));
    }
  };

  if (!game) return null;

  return (
    <div className="game-card" onClick={() => navigate(`/game/${game.id}`)} style={{ cursor: "pointer" }}>
      <img
        src={game.background_image || "https://via.placeholder.com/300"}
        alt={game.name || "No Name"}
        className="game-image"
      />

      {/* Bookmark icon only visible when signed in */}
      <SignedIn>
        <div className="bookmark-icon" onClick={handleBookmarkToggle}>
          {isBookmarked ? (
            <FaBookmark size={20} color="gold" />
          ) : (
            <FaRegBookmark size={20} color="gray" />
          )}
        </div>
      </SignedIn>

      <div className="game-info">
        <h3 className="games-title">{game.name || "Unknown Game"}</h3>

        <div className="game-tags">
          <strong>Tags:</strong>{" "}
          {game.tags?.length > 0
            ? game.tags.slice(0, 3).map((tag) => tag.name).join(", ")
            : "No Tags"}
        </div>

        <div className="game-category">
          <strong>Category:</strong>{" "}
          {game.genres?.length > 0
            ? game.genres.map((genre) => genre.name).join(", ")
            : "Unknown"}
        </div>

        <div className="game-rating">
          <strong>Ratings:</strong> {game.rating !== undefined ? game.rating : "N/A"} / 5
        </div>
      </div>
    </div>
  );
};

export default GameCard;
