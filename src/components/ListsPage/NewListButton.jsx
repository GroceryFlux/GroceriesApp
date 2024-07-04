import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { PlusIcon } from '../Icons';
import { createList } from '../../UseCases/ExistingLists/BusinessLogic';

function NewListButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);

  return (
    <button
      onClick={() => {
        createList();
        setDisplayedPage('itemsDisplay');
      }}
      className="text-primary"
    >
      <PlusIcon />
    </button>
  );
}

export default NewListButton;
