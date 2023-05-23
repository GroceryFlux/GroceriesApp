import React from 'react';
import './index.css';
import ListsPage from './pages/ListsPage';
import ItemsPage from './pages/ItemsPage';
import { useThemeStore } from './store/theme/theme';
import ShoppingListPage from './pages/ShoppingListPage';
import { usePageStore } from './store/displayedMenu/displayedMenu';

function App() {
  const theme = useThemeStore((state) => state.theme);
  const displayedPage = usePageStore((state) => state.displayedPage);

  return (
    <>
      <div
        className={`flex flex-col min-w-[280px] items-center w-screen h-screen ${
          theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''
        }`}
      >
        {displayedPage === 'itemsDisplay' ? (
          <ItemsPage />
        ) : displayedPage === 'shoppingListDisplay' ? (
          <ShoppingListPage />
        ) : (
          <ListsPage />
        )}
      </div>
    </>
  );
}

export default App;
