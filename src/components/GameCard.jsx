import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/bookmarkSlice";
import { FaRegBookmark, FaBookmark, FaStar } from "react-icons/fa";
import { SignedIn } from "@clerk/clerk-react";
import "./GameCard.css";

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookmarks = useSelector((state) => state.bookmark.bookmarkedGames);
  const isBookmarked = bookmarks.some((item) => item.id === game.id);

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    isBookmarked
      ? dispatch(removeBookmark(game.id))
      : dispatch(addBookmark(game));
  };

  if (!game) return null;

  return (
    <div className="simple-card" onClick={() => navigate(`/game/${game.id}`)}>
      <div className="simple-image-container">
        <img
          src={game.background_image || "https://via.placeholder.com/300"}
          alt={game.name}
          className="simple-image"
        />
        <SignedIn>
          <div className="simple-bookmark" onClick={handleBookmarkToggle}>
            {isBookmarked ? (
              <FaBookmark size={18} color="#ffcc00" />
            ) : (
              <FaRegBookmark size={18} color="#333" />
            )}
          </div>
        </SignedIn>
      </div>

      <div className="simple-info">
        <h3 className="simple-title">{game.name}</h3>
        <p className="simple-tags">
          <strong>Tags:</strong>{" "}
          {game.tags?.slice(0, 3).map((tag) => tag.name).join(", ") || "N/A"}
        </p>
        <p className="simple-category">
          <strong>Category:</strong>{" "}
          {game.genres?.map((genre) => genre.name).join(", ") || "Unknown"}
        </p>
      </div>

      <div className="simple-rating">
        <FaStar color="#f4c430" style={{ marginRight: "5px" }} />
        {game.rating ?? "N/A"} / 5
      </div>
    </div>
  );
};

export default GameCard;
