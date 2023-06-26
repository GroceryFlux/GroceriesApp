import React from 'react';
import OpenShoppingListButton from './OpenShoppingListButton';
import ToggleThemeButton from './ToggleThemeButton';

function ListsPageHeader() {
  return (
    <>
      <ToggleThemeButton />
      <div className="">
        <h1 className="font-medium text-2xl text-center">Groceries</h1>
      </div>
      <OpenShoppingListButton />
    </>
  );
}

export default ListsPageHeader;
