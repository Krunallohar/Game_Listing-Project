import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { searchGames } from "../utils/FetchGames"; // New search function
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.length > 2) { // Minimum 3 characters before searching
        const results = await searchGames(searchTerm);
        setSearchResults(results || []);
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchClick = (gameId) => {
    setSearchTerm(""); // Clear search input
    setSearchResults([]); // Hide dropdown
    navigate(`/game/${gameId}`); // Navigate to game details
  };

  return (
    <div className="container-fluid px-3 py-3 shadow-lg rounded header-container">
      <div className="header-content">
        {/* Logo - Navigates to Home */}
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <span role="img" aria-label="game-icon" className="fs-3">🎮</span>
          Game Listing
        </Link>

        {/* Search Bar with Dropdown */}
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="search"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </div>

          {/* Dropdown for search suggestions */}
          {searchResults.length > 0 && (
            <ul className="search-dropdown">
              {searchResults.map((game) => (
                <li key={game.id} onClick={() => handleSearchClick(game.id)}>
                  {game.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Bookmark Button */}
        <div className="bookmark-desktop">
          <Link to="/bookmarks" className="bookmark-btn">🔖 Bookmark</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
