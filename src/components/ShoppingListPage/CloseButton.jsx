import React from 'react';
import { ClearIcon } from '../Icons/index.js';
import { usePageStore } from '../../store/displayedMenu/displayedMenu.js';

export default function CloseButton() {
  const toggleShoppingListVisible = usePageStore((state) => state.toggleShoppingListVisible);

  return (
    <>
      <button
        onClick={() => toggleShoppingListVisible()}
        className="text-primary"
      >
        <ClearIcon />
      </button>
    </>
  );
}
