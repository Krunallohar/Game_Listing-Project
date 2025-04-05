import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/bookmarkSlice";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { SignedIn, SignedOut, useUser, SignInButton } from "@clerk/clerk-react";
import "./GameDetail.css";

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmark.bookmarkedGames);
  const [game, setGame] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`
      );
      const data = await response.json();

      const screenshotsRes = await fetch(
        `https://api.rawg.io/api/games/${id}/screenshots?key=${import.meta.env.VITE_RAWG_API_KEY}`
      );
      const screenshotsData = await screenshotsRes.json();

      setGame({
        ...data,
        screenshots: screenshotsData.results,
      });
    };

    fetchGameDetails();
  }, [id]);

  if (!game) return <div>Loading...</div>;

  const isBookmarked = bookmarks?.some((item) => item.id === game.id);
  const handleAddBookmark = () => dispatch(addBookmark(game));
  const handleRemoveBookmark = () => dispatch(removeBookmark(game.id));

  return (
    <div className="game-detail-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="game-detail-box">
        <img
          src={game.background_image}
          alt={game.name}
          className="game-image-full"
        />

        <div className="game-detail-content">
          <div className="title-bookmark-container">
            <h1 className="game-title">{game.name}</h1>

            <SignedIn>
              <div className="detail-actions">
                {isBookmarked ? (
                  <button className="bookmark-btn-detail active" onClick={handleRemoveBookmark}>
                    <FaBookmark size={20} /> Bookmarked
                  </button>
                ) : (
                  <button className="bookmark-btn-detail" onClick={handleAddBookmark}>
                    <FaRegBookmark size={20} /> Bookmark
                  </button>
                )}
              </div>
            </SignedIn>

            <SignedOut>
              <div className="detail-actions">
                <SignInButton>
                  <button className="bookmark-btn-detail">
                    <FaRegBookmark size={20} /> Sign in to Bookmark
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>

          <div className="game-meta">
            <span>⭐ Rating: {game.rating}</span>
            <span>📅 Released: {game.released}</span>
          </div>

          <div className="game-description">
            <p dangerouslySetInnerHTML={{ __html: game.description }} />
          </div>

          {game.screenshots?.length > 0 && (
            <div className="screenshot-slider">
              <h3>Screenshots</h3>
              <div className="screenshot-grid">
                {game.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot.image}
                    alt={`Screenshot ${index + 1}`}
                    className="screenshot-img"
                  />
                ))}
              </div>
            </div>
          )}

          {game.platforms && (
            <div className="requirements-section">
              <h3>System Requirements</h3>
              {game.platforms.map((platform, idx) => (
                <div key={idx} className="platform-block">
                  <strong>{platform.platform.name}</strong>
                  {platform.requirements?.minimum && (
                    <p>🧾 Min: {platform.requirements.minimum}</p>
                  )}
                  {platform.requirements?.recommended && (
                    <p>✅ Recommended: {platform.requirements.recommended}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
