import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import { Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, clearBookmarks } from './redux/bookmarkSlice';

const SidebarContext = createContext();

function App() {
  const location = useLocation();
  const isBookmarkPage = location.pathname === "/bookmarks";
  const isGameDetailPage = location.pathname.startsWith("/game/");
  const dispatch = useDispatch();
  const { isSignedIn, user, isLoaded } = useUser();
  const userId = useSelector((state) => state.bookmark.userId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user?.id && user?.id !== userId) {
        dispatch(setUserId(user.id));
      } else if (!isSignedIn && userId !== null) {
        dispatch(clearBookmarks());
      }
    }
  }, [isSignedIn, user, isLoaded, dispatch, userId]);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <Header />
      <div className="app-layout">
        
        {/* Sidebar Only on Specific Pages */}
        {!(isBookmarkPage || isGameDetailPage) && (
          <>
            <Sidebar
              onApplyFilters={() => {}}
              onResetFilters={() => {}}
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
            />

            {/* Show Filters Button when Sidebar is closed */}
            {!isSidebarOpen && (
              <button
                className="open-sidebar-btn"
                onClick={() => setIsSidebarOpen(true)}
              >
                Show Filters
              </button>
            )}
          </>
        )}

        <div className="main-content" style={{ transition: "margin-left 0.3s ease" }}>
          <Outlet />
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export default App;
