import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { searchGames } from "../utils/FetchGames";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.length > 2) {
        const results = await searchGames(searchTerm);
        setSearchResults(results || []);
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchClick = (gameId) => {
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="container-fluid px-3 py-3 shadow-lg rounded header-container">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <span role="img" aria-label="game-icon" className="fs-3">🎮</span>
          Game Listing
        </Link>

        {/* Search Bar */}
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

          {searchResults.length > 0 && (
            <ul className="search-dropdown">
              {searchResults.map((game) => (
                <li key={game.id} onClick={() => handleSearchClick(game.id)}>
                  <img src={game.background_image} alt={game.name} className="search-game-img" />
                  {game.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Bookmark & Auth Section */}
        <div className="header-right">
          <SignedIn>
            {/* Bookmark visible only when signed in */}
            <Link to="/bookmarks" className="bookmark-btn">🔖 Bookmark</Link>
            {/* Auth user button on right side */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            {/* Show sign in / sign up when not signed in */}
            <SignInButton mode="modal">
              <button className="btn btn-outline-primary ms-3">Sign In / Sign Up</button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header;
