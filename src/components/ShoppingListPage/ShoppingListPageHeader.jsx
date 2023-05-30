import React from 'react';
import ClearShoppingListButton from './ClearShoppingListButton';
import BackButton from '../shared/BackButton';

function ShoppingListHeader() {
  return (
    <div className="flex items-center justify-around mt-4 mb-8 w-3/4">
      <BackButton />
      <div>
        <h1 className="font-medium text-2xl text-center">Shopping list</h1>
      </div>
      <ClearShoppingListButton />
    </div>
  );
}

export default ShoppingListHeader;
