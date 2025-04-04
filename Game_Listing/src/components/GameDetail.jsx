import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/bookmarkSlice";
import "./GameDetail.css";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarkedGames);
  const isBookmarked = bookmarks.some((item) => item.id === game?.id);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const data = await response.json();
        setGame(data);

        // Fetch screenshots
        const screenRes = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`);
        const screenData = await screenRes.json();
        setScreenshots(screenData.results || []);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [id, API_KEY]);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(game.id));
    } else {
      dispatch(addBookmark(game));
    }
  };

  if (!game) return <div>Loading...</div>;

  const requirements = game.platforms?.[0]?.requirements;

  return (
    <div className="game-detail-container">
      <h1>{game.name}</h1>

      <div className="top-section">
        <img
          className="main-image"
          src={game.background_image}
          alt={game.name}
        />
        <button className="bookmark-btn" onClick={handleBookmarkToggle}>
          {isBookmarked ? "★ Bookmarked" : "☆ Add to Bookmarks"}
        </button>
      </div>

      <p className="description" dangerouslySetInnerHTML={{ __html: game.description }}></p>

      <div className="info-section">
        <p><strong>Released:</strong> {game.released}</p>
        <p><strong>Rating:</strong> {game.rating} / 5</p>
        <p><strong>Genres:</strong> {game.genres.map((g) => g.name).join(", ")}</p>
      </div>

      {screenshots.length > 0 && (
        <div className="screenshot-slider">
          <h3>Screenshots</h3>
          <div className="screenshots">
            {screenshots.map((shot) => (
              <img key={shot.id} src={shot.image} alt="Screenshot" />
            ))}
          </div>
        </div>
      )}

      {requirements && (
        <div className="requirements-section">
          <h3>System Requirements</h3>
          <p><strong>Minimum:</strong> {requirements.minimum}</p>
          <p><strong>Recommended:</strong> {requirements.recommended}</p>
        </div>
      )}
    </div>
  );
};

export default GameDetail;
