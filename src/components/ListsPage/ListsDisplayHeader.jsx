import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import DisplayShoppingListButton from './DisplayShoppingListButton';

function ListsPageHeader() {
  return (
    <div className="flex items-center justify-around mt-4 mb-8">
      <ThemeToggleButton />
      <div className="">
        <h1 className="font-medium text-2xl text-center">Groceries</h1>
      </div>
      <DisplayShoppingListButton />
    </div>
  );
}

export default ListsPageHeader;
