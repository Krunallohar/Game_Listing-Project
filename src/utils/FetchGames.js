const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL = "https://api.rawg.io/api"

// Fetch games with filters applied
export const fetchGames = async (page = 1, filters = {}) => {
  let url = `${API_URL}/games?page=${page}&page_size=20&key=${API_KEY}`;

  try {
    if (filters.genre) url += `&genres=${filters.genre}`;
    if (filters.tag) url += `&tags=${filters.tag}`;
    if (filters.year) url += `&dates=${filters.year}-01-01,${filters.year}-12-31`;
    if (filters.ordering) url += `&ordering=${filters.ordering}`;
  

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
      `${API_URL}/games?search=${query}&key=${API_KEY}`
    );

    const data = await response.json();
    return data.results.slice(0, 5);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
  
};


export const tagAndGenre = async (query) => {

  try{
    const response = await fetch(`${API_URL}/${query}?key=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch games");
        const data= await response.json();
        return data.results;
  }
  catch (error) {
    console.error("Error fetching game:", error);
    return null;

  }
}
