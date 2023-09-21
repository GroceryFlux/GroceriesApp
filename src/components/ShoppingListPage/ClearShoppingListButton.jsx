import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { TrashIcon } from '../Icons';

function ClearShoppingListButton() {
  const clearShoppingList = useListsStore((state) => state.clearShoppingList);

  return (
    <button
      onClick={() => clearShoppingList()}
      className="flex text-red-500/70 pt-1 pr-1"
    >
      Clear list
      <TrashIcon />
    </button>
  );
}

export default ClearShoppingListButton;
