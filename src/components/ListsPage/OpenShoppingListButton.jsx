import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { CartIcon } from '../Icons';

function OpenShoppingListButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);

  return (
    <button
      className="pt-0.5"
      onClick={() => setDisplayedPage('shoppingListDisplay')}
    >
      <CartIcon />
    </button>
  );
}

export default OpenShoppingListButton;
