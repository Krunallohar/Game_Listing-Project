import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGame();
  }, [id, API_KEY]);

  if (!game) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{game.name}</h1>
      <img
        src={game.background_image}
        alt={game.name}
        style={{ width: "100%", maxWidth: "600px", marginBottom: "1rem" }}
      />
      <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
      <p><strong>Released:</strong> {game.released}</p>
      <p><strong>Rating:</strong> {game.rating}</p>
      <p><strong>Genres:</strong> {game.genres.map(g => g.name).join(", ")}</p>
    </div>
  );
};

export default GameDetail;
