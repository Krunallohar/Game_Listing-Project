import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GameDetails.css";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=YOUR_API_KEY`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!game) return <p>Game not found</p>;

  return (
    <div className="game-details">
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} className="game-image" />

      <h2>Description</h2>
      <p>{game.description_raw || "No description available."}</p>

      <h2>Screenshots</h2>
      <div className="screenshots">
        {game.short_screenshots?.map((screenshot) => (
          <img key={screenshot.id} src={screenshot.image} alt="screenshot" />
        ))}
      </div>

      <h2>Pricing</h2>
      <p>{game.metacritic ? `Metacritic Score: ${game.metacritic}` : "Pricing not available"}</p>

      <h2>Ratings</h2>
      <p>{game.rating} / 5 ({game.ratings_count} reviews)</p>

      <h2>System Requirements</h2>
      <p>{game.platforms?.map((platform) => `${platform.platform.name}: ${platform.requirements?.minimum || "No info"}`).join("\n")}</p>
    </div>
  );
};

export default GameDetails;
