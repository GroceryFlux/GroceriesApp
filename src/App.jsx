import React from 'react';
import './index.css';
import ListsPage from './pages/ListsPage';
import ItemsPage from './pages/ItemsPage';
import ShoppingListPage from './pages/ShoppingListPage';
import { usePageStore } from './store/displayedMenu/displayedMenu';

function App() {
  const displayedMenu = usePageStore((state) => state.displayedMenu);

  let displayedPage;

  switch (displayedMenu) {
  case 'itemsDisplay':
    displayedPage = <ItemsPage />;
    break;
  case 'shoppingListDisplay':
    displayedPage = <ShoppingListPage />;
    break;
  case 'listsDisplay':
    displayedPage = <ListsPage />;
    break;
  }

  return (
    <>
      <div className={`flex flex-col items-center min-h-screen w-screen`}>{displayedPage}</div>
    </>
  );
}

export default App;
