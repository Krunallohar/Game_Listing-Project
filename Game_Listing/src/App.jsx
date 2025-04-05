import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import { Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, clearBookmarks } from './redux/bookmarkSlice';

function App() {
  const location = useLocation();
  const isBookmarkPage = location.pathname === "/bookmarks";
  const isGameDetailPage = location.pathname.startsWith("/game/");
  const dispatch = useDispatch();
  const { isSignedIn, user, isLoaded } = useUser();
  const userId = useSelector((state) => state.bookmark.userId);

  useEffect(() => {
    // Only update when Clerk is loaded
    if (isLoaded) {
      if (isSignedIn && user?.id && user?.id !== userId) {
        dispatch(setUserId(user.id));
      } else if (!isSignedIn && userId !== null) {
        dispatch(clearBookmarks());
      }
    }
  }, [isSignedIn, user, isLoaded, dispatch, userId]);

  return (
    <>
      <Header />
      {!(isBookmarkPage || isGameDetailPage) && <Sidebar />}
      <Outlet />
    </>
  );
}

export default App;
