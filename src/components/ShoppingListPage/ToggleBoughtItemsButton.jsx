import React from 'react';
import { useBoughtItemsStore } from '../../store/displayedMenu/displayedMenu';

function ToggleBoughtItemsButton() {
  const showBoughtItems = useBoughtItemsStore((state) => state.showBoughtItems);
  const toggleBoughtItemsVisibility = useBoughtItemsStore((state) => state.toggleBoughtItemsVisibility);

  return (
    <button onClick={() => toggleBoughtItemsVisibility()}>
      {showBoughtItems === false ? (
        <i className="fa-solid fa-chevron-down"></i>
      ) : (
        <i className="fa-solid fa-chevron-up"></i>
      )}
    </button>
  );
}

export default ToggleBoughtItemsButton;
