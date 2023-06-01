import React from 'react';
import { useBoughtItemsStore } from '../../store/displayedMenu/displayedMenu';

function ToggleBoughtItemsButton() {
  const showBoughtItems = useBoughtItemsStore((state) => state.showBoughtItems);
  const toggleBoughtItemsVisibility = useBoughtItemsStore((state) => state.toggleBoughtItemsVisibility);
  

  return (
    <div onClick={() => toggleBoughtItemsVisibility()}>
      {showBoughtItems === false ? (
        <i className="fa-solid fa-chevron-up"></i>
      ) : (
        <i className="fa-solid fa-chevron-down"></i>
      )}
    </div>
  );
}

export default ToggleBoughtItemsButton;
