import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import { Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setUserId, clearBookmarks } from './redux/bookmarkSlice';

function App() {
  const location = useLocation();
  const isBookmarkPage = location.pathname === "/bookmarks";
  const isGameDetailPage = location.pathname.startsWith("/game/");
  const dispatch = useDispatch();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user?.id) {
      // Set user ID and load bookmarks from localStorage
      dispatch(setUserId(user.id));
    } else {
      // Clear user ID and bookmarks when signed out
      dispatch(clearBookmarks());
    }
  }, [isSignedIn, user, dispatch]);

  return (
    <>
      <Header />
      {!(isBookmarkPage || isGameDetailPage) && <Sidebar />}
      <Outlet />
    </>
  );
}

export default App;
