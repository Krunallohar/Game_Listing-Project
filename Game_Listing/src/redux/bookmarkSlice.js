// src/redux/bookmarkSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  loadBookmarksFromLocalStorage,
  saveBookmarksToLocalStorage,
} from "../utils/bookmarkStorage";

const initialState = {
  bookmarkedGames: [],
  userId: null,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.bookmarkedGames = loadBookmarksFromLocalStorage(action.payload);
    },
    addBookmark: (state, action) => {
      const exists = state.bookmarkedGames.some(
        (game) => game.id === action.payload.id
      );
      if (!exists) {
        state.bookmarkedGames.push(action.payload);
        saveBookmarksToLocalStorage(state.userId, state.bookmarkedGames);
      }
    },
    removeBookmark: (state, action) => {
      state.bookmarkedGames = state.bookmarkedGames.filter(
        (game) => game.id !== action.payload
      );
      saveBookmarksToLocalStorage(state.userId, state.bookmarkedGames);
    },
    clearBookmarks: (state) => {
      state.bookmarkedGames = [];
      if (state.userId) {
        saveBookmarksToLocalStorage(state.userId, []);
      }
    },
    setBookmarksManually: (state, action) => {
      // This is used by the setBookmarks thunk below
      state.bookmarkedGames = action.payload;
    },
  },
});

export const {
  addBookmark,
  removeBookmark,
  setUserId,
  clearBookmarks,
  setBookmarksManually,
} = bookmarkSlice.actions;

/**
 * Optional thunk to manually set bookmarks from async code or other useEffect triggers
 */
export const setBookmarks = (bookmarks) => (dispatch, getState) => {
  const { userId } = getState().bookmark;
  if (userId) {
    saveBookmarksToLocalStorage(userId, bookmarks);
    dispatch(setBookmarksManually(bookmarks));
  }
};

export default bookmarkSlice.reducer;
