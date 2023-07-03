import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { OutlineCartIcon } from '../Icons';

function OpenShoppingListButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);

  return (
    <button
      className="text-primary"
      onClick={() => setDisplayedPage('shoppingListDisplay')}
    >
      <OutlineCartIcon />
    </button>
  );
}

export default OpenShoppingListButton;
