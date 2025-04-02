import React, { useState } from "react";

const Sidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    tag: "",
    year: "",
    popularity: "",
  });

  const [isOpen, setIsOpen] = useState(true); // Sidebar visibility state

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "❌" : "📂"}
      </button>

      {isOpen && (
        <div className="sidebar-content">
          <h2>Filters</h2>

          {/* Category Filter */}
          <div className="filter-group">
            <label>Category:</label>
            <select name="category" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="rpg">RPG</option>
              <option value="strategy">Strategy</option>
            </select>
          </div>

          {/* Tags Filter */}
          <div className="filter-group">
            <label>Tags:</label>
            <select name="tag" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="multiplayer">Multiplayer</option>
              <option value="singleplayer">Singleplayer</option>
              <option value="open-world">Open World</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="filter-group">
            <label>Release Year:</label>
            <select name="year" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          {/* Popularity Filter */}
          <div className="filter-group">
            <label>Popularity:</label>
            <select name="popularity" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="most-popular">Most Popular</option>
              <option value="trending">Trending</option>
              <option value="new">New Releases</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
