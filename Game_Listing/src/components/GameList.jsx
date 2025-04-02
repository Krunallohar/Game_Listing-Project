import React, { useEffect, useState } from "react";
import { fetchGames } from "../utils/FetchGames";
import GameCard from "./GameCard";
import "./GameList.css";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames(currentPage);
      if (data) {
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / 20)); // Calculate total pages
      }
    };
    loadGames();
  }, [currentPage]);

  return (
    <div className="game-list-container">
      <div className="game-list">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GameList;
