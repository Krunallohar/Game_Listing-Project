import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import GameList from "./components/GameList.jsx";
import GameDetail from "./components/GameDetail.jsx"; // ✅ Make sure it's GameDetails not GameDetail
import BookmarkedGames from "./components/BookmarkedGames.jsx"; // ✅ Import it
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <GameList />,
      },
      {
        path: "game/:id",
        element: <GameDetail />,
      },
      {
        path: "bookmarks", // ✅ ADD THIS ROUTE
        element: <BookmarkedGames />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
