import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmarkSlice";
import { useUser } from "@clerk/clerk-react";
 // ✅ for future Clerk actions

const loadInitialBookmarks = () => {
  try {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return { bookmarkedGames: [], userId: null };

    const savedData = localStorage.getItem(`bookmarks_${userId}`);
    const parsed = savedData ? JSON.parse(savedData) : [];
    return {
      bookmarkedGames: parsed,
      userId,
    };
  } catch (e) {
    console.error("Failed to load bookmarks from localStorage", e);
    return { bookmarkedGames: [], userId: null };
  }
};

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
  },
  preloadedState: {
    bookmark: loadInitialBookmarks(),
  },
});

// Persist bookmarks and user ID to localStorage
store.subscribe(() => {
  const state = store.getState();
  const { userId, bookmarkedGames } = state.bookmark;

  if (userId) {
    localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(bookmarkedGames));
    localStorage.setItem("currentUserId", userId);
  } else {
    // Optional: Clean up if user logs out
    localStorage.removeItem("currentUserId");
  }
});

export default store;
