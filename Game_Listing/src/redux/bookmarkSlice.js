import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmarkedGames: [],
  },
  reducers: {
    addBookmark: (state, action) => {
      if (!state.bookmarkedGames.some(game => game.id === action.payload.id)) {
        state.bookmarkedGames.push(action.payload);
      }
    },
    removeBookmark: (state, action) => {
      state.bookmarkedGames = state.bookmarkedGames.filter(game => game.id !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
