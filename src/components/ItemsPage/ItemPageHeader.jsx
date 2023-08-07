import React from 'react';
import BackButton from '../shared/BackButton';
import ListTitleInput from './ListTitleInput';
import OpenShoppingListButton from '../ListsPage/OpenShoppingListButton.jsx';

function ItemPageHeader() {
  return (
    <>
      <BackButton />
      <ListTitleInput />
      <OpenShoppingListButton />
    </>
  );
}

export default ItemPageHeader;
