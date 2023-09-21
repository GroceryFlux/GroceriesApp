import React, { useEffect, useState } from 'react';
import './index.css';
import ListsPage from './pages/ListsPage';
import ItemsPage from './pages/ItemsPage';
import ShoppingListPage from './pages/ShoppingListPage';
import { usePageStore } from './store/displayedMenu/displayedMenu';

function App() {
  const displayedMenu = usePageStore((state) => state.displayedMenu);
  const isShoppingListVisible = usePageStore((state) => state.isShoppingListVisible);
  const [display, setDisplay] = useState('hidden');
  let displayedPage;

  switch (displayedMenu) {
    case 'itemsDisplay':
      displayedPage = <ItemsPage />;
      break;
    case 'listsDisplay':
      displayedPage = <ListsPage />;
      break;
  }

  useEffect(() => {
    if (!isShoppingListVisible) {
      const timeout = setTimeout(() => setDisplay('hidden'), 350);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setDisplay('flex'), 1);
    return () => clearTimeout(timeout);
  }, [isShoppingListVisible]);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen w-screen">{displayedPage}</div>
      <div
        className={`absolute z-10 left-0 transition-all duration-300 ${isShoppingListVisible ? 'top-0' : 'top-full'} `}
      >
        <div
          className={`${display} flex-col bg-base-100 items-center min-h-screen w-screen duration-300 ${
            isShoppingListVisible ? 'opacity-1' : 'opacity-0'
          }`}
        >
          <ShoppingListPage />
        </div>
      </div>
    </>
  );
}

export default App;
