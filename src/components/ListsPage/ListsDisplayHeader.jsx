import React from 'react';
import OpenShoppingListButton from './OpenShoppingListButton';
import ToggleThemeButton from './ToggleThemeButton';

function ListsPageHeader() {
  return (
    <>
      <ToggleThemeButton />
      <h1 className="font-medium text-4xl text-center">Groceries</h1>
      <OpenShoppingListButton />
    </>
  );
}

export default ListsPageHeader;
