import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import ClearIcon from '../Icons/ClearIcon';

function ClearShoppingListButton() {
  const clearShoppingList = useListsStore((state) => state.clearShoppingList);

  return (
    <button
      onClick={() => clearShoppingList()}
      className="text-primary"
    >
      <ClearIcon />
    </button>
  );
}

export default ClearShoppingListButton;
