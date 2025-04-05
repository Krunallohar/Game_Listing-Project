import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { tagAndGenre } from "../utils/FetchGames";

const Sidebar = ({ onApplyFilters, onResetFilters, isSidebarOpen, onToggleSidebar }) => {
  const [filters, setFilters] = useState({
    genre: "",
    tag: "",
    year: "",
    ordering: "",
  });

  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const gameData = await tagAndGenre("genres");
        setGenres(gameData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const gameData = await tagAndGenre("tags");
        setTags(gameData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({ genre: "", tag: "", year: "", ordering: "" });
    onResetFilters();
  };

  return (
    <div className="sidebar" style={{ left: isSidebarOpen ? "0" : "-100%" }}>
      <div className="sidebar-content">
        <button className="hide-sidebar-btn" onClick={onToggleSidebar}>✖</button>
        <h2>Filters</h2>

        <div className="filter-group">
          <label>Genre:</label>
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.slug}>{genre.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Tags:</label>
          <select name="tag" value={filters.tag} onChange={handleFilterChange}>
            <option value="">All</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.slug}>{tag.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Release Year:</label>
          <input
            type="number"
            name="year"
            value={filters.year}
            placeholder="Enter Year"
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label>Popularity:</label>
          <select name="ordering" value={filters.ordering} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="-rating">Highest Rated</option>
            <option value="-metacritic">Best Reviews</option>
            <option value="-added">Most Added</option>
            <option value="-released">Latest Releases</option>
          </select>
        </div>

        <button className="apply-btn" onClick={handleApply}>Apply Filters</button>
        <button className="reset-btn" onClick={handleReset}>Reset Filters</button>
      </div>
    </div>
  );
};

export default Sidebar;
