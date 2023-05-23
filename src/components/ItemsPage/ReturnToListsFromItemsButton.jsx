import React from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';

function ReturnToListsFromItemButton() {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);

  return (
    <button
      onClick={() => setDisplayedPage('listsDisplay')}
      className="text-1xl font-bold min-w-[5rem]"
      type="button"
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
}

export default ReturnToListsFromItemButton;
