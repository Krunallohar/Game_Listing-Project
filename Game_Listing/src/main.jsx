// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import GameList from "./components/GameList.jsx";
import GameDetail from "./components/GameDetail.jsx"; // or GameDetails.jsx if renamed
import BookmarkedGames from "./components/BookmarkedGames.jsx";
import store from "./redux/store"; // 👈 make sure the path is correct
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
        path: "/game/:id",
        element: <GameDetail />, // or <GameDetails />
      },
      {
        path: "/bookmarks",
        element: <BookmarkedGames />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ Wrap the whole app */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
