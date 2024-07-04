import React from 'react';
import { TrashIcon } from '../Icons';
import { clearItemsFromShoppingList } from '../../UseCases/ShoppingList/BusinessLogic';

function ClearShoppingListButton() {
  return (
    <button
      onClick={() => clearItemsFromShoppingList()}
      className="flex text-red-500/70 pt-1 pr-1"
    >
      Clear list
      <TrashIcon />
    </button>
  );
}

export default ClearShoppingListButton;
