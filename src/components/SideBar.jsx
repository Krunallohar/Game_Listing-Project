import React, { useState, useEffect } from "react";
import "./SideBar.css";

const Sidebar = ({ onApplyFilters, onResetFilters }) => {
  const [filters, setFilters] = useState({
    genre: "",
    tag: "",
    year: "",
    ordering: "",
  });

  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("https://api.rawg.io/api/genres?key=194d1de13bf04a3fa84eedccbd36e579")
      .then((res) => res.json())
      .then((data) => setGenres(data.results));

    fetch("https://api.rawg.io/api/tags?key=194d1de13bf04a3fa84eedccbd36e579")
      .then((res) => res.json())
      .then((data) => setTags(data.results));
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
    <div className="sidebar open">
      <div className="sidebar-content">
        <h2>Filters</h2>

        {/* Genre Filter */}
        <div className="filter-group">
          <label>Genre:</label>
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.slug}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Filter */}
        <div className="filter-group">
          <label>Tags:</label>
          <select name="tag" value={filters.tag} onChange={handleFilterChange}>
            <option value="">All</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.slug}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {/* Release Year Filter */}
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

        {/* Popularity Filter */}
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

        {/* Apply & Reset Buttons */}
        <button className="apply-btn" onClick={handleApply}>
          Apply Filters
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
