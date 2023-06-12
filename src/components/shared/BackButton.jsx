import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { useListsStore } from '../../store/lists/lists';

function BackButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const listID = useListsStore((state) => state.selectedListID)
  const list = useListsStore((state) => state.existingLists.get(listID))
  const deleteList = useListsStore((state) => state.deleteList)
  const displayedMenu = usePageStore((state) => state.displayedMenu)
  const saveExistingLists = useListsStore((state) => state.saveExistingLists)

  function checkEmptyList() {
    if(displayedMenu === 'itemsDisplay'){
      if(list.title === '' && list.itemsList.size === 0){
        deleteList(listID)
      }
      else if(list.title === '') {
        list.title = 'No title'
        saveExistingLists(listID, list)
      }
    }
  }

  return (
    <button
      onClick={() => {
        setDisplayedPage('listsDisplay')
        checkEmptyList()
      }}
      className="text-1xl font-bold"
      type="button"
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
}

export default BackButton;
