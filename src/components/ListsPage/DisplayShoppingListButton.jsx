import React from 'react';
import { useDisplayedMenuStore } from '../../store/displayedMenu/displayedMenu';

function DisplayShoppingListButton() {
  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu);

  return (
    <div className="self-end">
      <button
        className="text-xl"
        onClick={() => setDisplayedMenu('shoppingListDisplay')}
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
}

export default DisplayShoppingListButton;
