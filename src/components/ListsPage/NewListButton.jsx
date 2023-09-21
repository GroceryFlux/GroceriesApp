import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { PlusIcon } from '../Icons';

function NewListButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const createList = useListsStore((state) => state.createList);

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
