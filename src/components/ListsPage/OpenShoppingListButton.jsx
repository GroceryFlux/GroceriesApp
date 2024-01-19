import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { OutlineCartIcon } from '../Icons';
import { useExistingShoppingListStore } from '../../UseCases/ShoppingList/Store.js';
import { getMissingShoppingListItemsAmount } from '../../UseCases/ShoppingList/BusinessLogic.js';

function OpenShoppingListButton() {
  const toggleShoppingListVisible = usePageStore((state) => state.toggleShoppingListVisible);
  const animation = useExistingShoppingListStore((state) => state.animation)

  const missingItemsAmount = getMissingShoppingListItemsAmount();

  return (
    <div className="indicator">
      <span
        className={`duration-150 ${animation} indicator-item badge bg-secondary border-none ${
          missingItemsAmount > 0 ? 'visible' : 'invisible'
        }`}
      >
        {missingItemsAmount}
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
