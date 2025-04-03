export const API_KEY = "194d1de13bf04a3fa84eedccbd36e579";

// Fetches full game list
export const fetchGames = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?page=${page}&page_size=20&key=${API_KEY}`
    );
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
    return data.results.slice(0, 5); // Return only top 5 results
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
