import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from "@clerk/clerk-react";

import App from "./App.jsx";
import GameList from "./components/GameList.jsx";
import GameDetail from "./components/GameDetail.jsx";
import BookmarkedGames from "./components/BookmarkedGames.jsx";
import store from "./redux/store";
import "./index.css";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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
        element: <GameDetail />,
      },
      {
        path: "/bookmarks",
        element: (
          <>
            <SignedIn>
              <BookmarkedGames />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
