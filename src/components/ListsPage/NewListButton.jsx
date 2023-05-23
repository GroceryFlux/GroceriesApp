import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { useSelectedListIDStore } from '../../store/selectedList/selectedList';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';

function NewListButton() {
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);
  const setSelectedListID = useSelectedListIDStore((state) => state.setSelectedListID);
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);

  return (
    <button
      className="text-xl"
      onClick={() => {
        const listID = crypto.randomUUID();
        const list = { title: '', timeStamp: undefined, itemsList: new Map() };
        saveExistingLists(listID, list);
        setSelectedListID(listID);
        setDisplayedPage('itemsDisplay');
      }}
    >
      <i className="fa-solid fa-circle-plus"></i>
    </button>
  );
}

export default NewListButton;
