import React from 'react';
import './index.css';
import ListsPage from './pages/ListsPage';
import ItemsPage from './pages/ItemsPage';
import ShoppingListDisplay from './components/ShoppingListDisplay';
import { useThemeStore } from './store/theme/theme';
import { useDisplayedMenuStore } from './store/displayedMenu/displayedMenu';


function App() {

  const theme = useThemeStore((state) => state.theme)
  const displayedMenu = useDisplayedMenuStore((state) => state.displayedMenu)

  return (
    <>
      <div className={`flex flex-col min-w-[280px] items-center w-screen h-screen ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}>
        {displayedMenu === 'itemsDisplay' ? (
          <ItemsPage />
        ) : (
          displayedMenu === 'shoppingListDisplay' ? (
            <ShoppingListDisplay />
          ) : (
            <ListsPage />
          ))}
      </div>
    </>
  );
}

export default App;
