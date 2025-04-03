export const API_KEY = "194d1de13bf04a3fa84eedccbd36e579";

// Fetch games with filters applied
export const fetchGames = async (page = 1, filters = {}) => {
  try {
    let url = `https://api.rawg.io/api/games?page=${page}&page_size=20&key=${API_KEY}`;

    if (filters.genre) url += `&genres=${filters.genre}`;
    if (filters.tag) url += `&tags=${filters.tag}`;
    if (filters.year) url += `&dates=${filters.year}-01-01,${filters.year}-12-31`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return null;
  }
};

// Fetch search results
export const searchGames = async (query) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`
    );
    const data = await response.json();
    return data.results.slice(0, 5);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
