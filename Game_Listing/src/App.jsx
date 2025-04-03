import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import GameList from './components/GameList';

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const isBookmarkPage = location.pathname === "/bookmarks"; // Hide sidebar on bookmarks page

  return (
    <>
      <Header />
      {!isBookmarkPage && <Sidebar />} {/* Sidebar is hidden on bookmarks page */}
      <Outlet />
      {/* <GameList/> */}
    </>
  );
}

export default App;