import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { useSelectedListStore } from '../../store/selectedList/selectedList';
import { useDisplayedMenuStore } from '../../store/displayedMenu/displayedMenu';

function NewListButton() {
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);
  const setSelectedList = useSelectedListStore((state) => state.setSelectedList);
  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu);

  return (
    <button
      className="text-xl"
      onClick={() => {
        const listID = crypto.randomUUID();
        const list = { title: '', timeStamp: undefined, itemsList: new Map() };
        saveExistingLists(listID, list);
        setSelectedList(listID);
        setDisplayedMenu('itemsDisplay');
      }}
    >
      <i className="fa-solid fa-circle-plus"></i>
    </button>
  );
}

export default NewListButton;
