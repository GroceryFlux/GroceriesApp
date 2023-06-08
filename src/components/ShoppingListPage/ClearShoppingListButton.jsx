import React from 'react';
import { useListsStore } from '../../store/lists/lists';

function ClearShoppingListButton() {
  const clearShoppingList = useListsStore((state) => state.clearShoppingList);

  return (
    <div>
      <button onClick={() => clearShoppingList()}>
        <i className="fa-regular fa-circle-xmark text-xl"></i>
      </button>
    </div>
  );
}

export default ClearShoppingListButton;
