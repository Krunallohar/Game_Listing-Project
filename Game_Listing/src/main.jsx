import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GameList from './components/GameList'; // Your main page
import Bookmark from './components/BookmarkedGames.jsx';
import BookmarkedGames from './components/BookmarkedGames.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <GameList /> }, // Show games list as homepage
      { path: "/bookmarks", element: <BookmarkedGames /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
