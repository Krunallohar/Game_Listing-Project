import React, { useEffect, useState } from "react";
import { fetchGames } from "../utils/FetchGames";
import GameCard from "./GameCard";
import Sidebar from "./SideBar";
import "./GameList.css";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames(currentPage, filters);
      if (data) {
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / 20));
      }
    };
    loadGames();
  }, [currentPage, filters]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  return (
    <div className="game-page">
      <Sidebar onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} />
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
    </div>
  );
};

export default GameList;
