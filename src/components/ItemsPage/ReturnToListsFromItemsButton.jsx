import React from 'react';
import { useDisplayedMenuStore } from '../../store/displayedMenu/displayedMenu';

function ReturnToListsFromItemButton() {
  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu);

  return (
    <button
      onClick={() => setDisplayedMenu('listsDisplay')}
      className="text-1xl font-bold min-w-[5rem]"
      type="button"
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
}

export default ReturnToListsFromItemButton;
