import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { useListsStore } from '../../store/lists/lists';
import ReturnIcon from '../Icons/ReturnIcon';

function BackButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists.get(listID));
  const deleteList = useListsStore((state) => state.deleteList);
  const displayedMenu = usePageStore((state) => state.displayedMenu);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);

  function checkEmptyList() {
    if (displayedMenu !== 'itemsDisplay') {
      return;
    }

    const hasTitle = list.title !== '';
    if (hasTitle) {
      return;
    }

    const hasNoItems = list.itemsList.size === 0;
    if (hasNoItems) {
      deleteList(listID);
      return;
    }

    list.title = '';
    saveExistingLists(listID, list);
  }

  return (
    <button
      onClick={() => {
        setDisplayedPage('listsDisplay');
        checkEmptyList();
      }}
      className="text-1xl font-bold"
      type="button"
    >
      <ReturnIcon />
    </button>
  );
}

export default BackButton;
