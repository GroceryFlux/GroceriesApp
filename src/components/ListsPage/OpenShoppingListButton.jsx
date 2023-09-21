import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { OutlineCartIcon } from '../Icons';
import { useListsStore } from '../../store/lists/lists.js';

function OpenShoppingListButton() {
  const toggleShoppingListVisible = usePageStore((state) => state.toggleShoppingListVisible);
  const shoppingList = useListsStore((state) => state.shoppingList);
  const animation = useListsStore((state) => state.animation);

  return (
    <div className="indicator">
      <span
        className={`duration-150 ${animation} indicator-item badge bg-secondary border-none ${
          shoppingList.size > 0 ? 'visible' : 'invisible'
        }`}
      >
        {shoppingList.size}
      </span>
      <button
        className="text-primary"
        onClick={() => toggleShoppingListVisible()}
      >
        <OutlineCartIcon />
      </button>
    </div>
  );
}

export default OpenShoppingListButton;
