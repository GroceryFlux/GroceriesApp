import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';

function NewListButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const createList = useListsStore((state) => state.createList);

  return (
    <button
      className="text-xl"
      onClick={() => {
        createList();
        setDisplayedPage('itemsDisplay');
      }}
    >
      <i className="fa-solid fa-circle-plus"></i>
    </button>
  );
}

export default NewListButton;
