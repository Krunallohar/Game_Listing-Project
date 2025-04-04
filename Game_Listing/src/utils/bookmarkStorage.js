// src/utils/bookmarkStorage.js

export const loadBookmarksFromLocalStorage = (userId) => {
    if (!userId) return [];
    try {
      const data = localStorage.getItem(`bookmarks_${userId}`);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Failed to load bookmarks from localStorage:", err);
      return [];
    }
  };
  
  export const saveBookmarksToLocalStorage = (userId, bookmarks) => {
    if (!userId) return;
    try {
      localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(bookmarks));
    } catch (err) {
      console.error("Failed to save bookmarks to localStorage:", err);
    }
  };
  