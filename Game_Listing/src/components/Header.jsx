import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container-fluid px-3 py-3 shadow-lg rounded header-container">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <span role="img" aria-label="game-icon" className="fs-3">🎮</span>
          Game Listing
        </div>

        {/* Search Bar - Centered */}
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="search"
              placeholder="Search games..."
              onChange={(e) => onSearch(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Bookmark Button (Visible only on Desktop) */}
        <div className="bookmark-desktop">
          <button className="bookmark-btn">🔖 Bookmark</button>
        </div>
      </div>

      {/* Mobile Dropdown Menu - Now Opens Downwards */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search games..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="btn btn-primary">Search</button>
        </div>
        <button className="bookmark-btn">🔖 Bookmark</button>
      </div>
    </div>
  );
};

export default Header;
