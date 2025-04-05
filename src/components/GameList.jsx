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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 👈 added this

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
    setIsSidebarOpen(false); // 👈 optional: auto-close on apply
  };

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  return (
    <div className="game-page">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      {/* 👇 Show Filters Button when Sidebar is closed */}
      {!isSidebarOpen && (
        <button className="open-sidebar-btn" onClick={() => setIsSidebarOpen(true)}>
          Show Filters
        </button>
      )}

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
