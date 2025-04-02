export const fetchGames = async (page = 1) => {
  const API_KEY = "194d1de13bf04a3fa84eedccbd36e579";

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
