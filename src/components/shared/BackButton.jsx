import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import ReturnIcon from '../Icons/ReturnIcon';
import { useSelectedListStore } from '../../UseCases/SelectedList/Store';
import { getList } from '../../UseCases/ExistingLists/Repository';
import { deleteList } from '../../UseCases/ExistingLists/BusinessLogic';

function BackButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const listID = useSelectedListStore((state) => state.selectedListID);
  const list = getList(listID);
  const displayedMenu = usePageStore((state) => state.displayedMenu);

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
