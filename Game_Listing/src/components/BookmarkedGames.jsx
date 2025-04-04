import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, removeBookmark } from "../redux/bookmarkSlice";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "./BookmarkedGames.css";

const BookmarkedGames = () => {
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser();
  const { bookmarkedGames, userId } = useSelector((state) => state.bookmark);

  useEffect(() => {
    if (isLoaded && user?.id) {
      dispatch(setUserId(user.id));
    }
  }, [isLoaded, user, dispatch]);

  const handleRemove = (e, gameId) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeBookmark(gameId));
  };

  if (!userId) {
    return <div>Please sign in to view bookmarks.</div>;
  }

  return (
    <div className="bookmarked-container">
      <h2>Your Bookmarked Games</h2>
      {bookmarkedGames.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <div className="bookmarked-grid">
          {bookmarkedGames.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              className="bookmarked-card-link"
            >
              <div className="bookmarked-card">
                <img src={game.background_image} alt={game.name} />
                <h3>{game.name}</h3>
                <p className="game-genres">
                  {game.genres?.map((genre) => genre.name).join(", ") || "No genres"}
                </p>
                <button onClick={(e) => handleRemove(e, game.id)}>Remove</button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedGames;
