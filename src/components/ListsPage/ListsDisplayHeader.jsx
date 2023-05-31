import React from 'react';
import DisplayShoppingListButton from './DisplayShoppingListButton';
import ToggleThemeButton from './ToggleThemeButton';

function ListsPageHeader() {
  return (
    <div className="flex items-center justify-around mt-4 mb-8">
      <ToggleThemeButton />
      <div className="">
        <h1 className="font-medium text-2xl text-center">Groceries</h1>
      </div>
      <DisplayShoppingListButton />
    </div>
  );
}

export default ListsPageHeader;
