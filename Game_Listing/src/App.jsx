import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import { Outlet } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isBookmarkPage = location.pathname === "/bookmarks";
  const isGameDetailPage = location.pathname.startsWith("/game/"); // 👈 detects detail page

  return (
    <>
      <Header />
      {!(isBookmarkPage || isGameDetailPage) && <Sidebar />} {/* 👈 hide sidebar */}
      <Outlet />
    </>
  );
}

export default App;
