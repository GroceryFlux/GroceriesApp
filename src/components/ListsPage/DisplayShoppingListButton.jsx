import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';

function DisplayShoppingListButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);

  return (
    <div className="self-end">
      <button
        className="text-xl"
        onClick={() => setDisplayedPage('shoppingListDisplay')}
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
}

export default DisplayShoppingListButton;
