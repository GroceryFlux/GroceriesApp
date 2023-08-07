import SpacingIcon from '../Icons/SpacingIcon.jsx';
import React from 'react';
import CloseButton from './CloseButton.jsx';

export default function ShoppingListHeader() {
  return (
    <>
      <SpacingIcon />
      <h1 className="font-medium text-2xl text-center">Shopping List</h1>
      <CloseButton />
    </>
  );
}
