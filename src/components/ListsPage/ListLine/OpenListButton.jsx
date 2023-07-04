import { React } from 'react';
import { usePageStore } from '../../../store/displayedMenu/displayedMenu';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function OpenListButton({ listID, list }) {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const setSelectedListID = useListsStore((state) => state.setSelectedListID);

  const itemNames = [...list.itemsList].map(([, item]) => item.itemName);

  function itemsPreview(listSize, itemNames) {
    let preview = '';
    if (listSize === 0) {
      preview = 'is empty'
      return preview
    }
    for (let i = 0; i < listSize; i++) {
      if (i < listSize - 1) {
        preview = `${preview + itemNames[i]}, `;
      } 
      else preview = preview + itemNames[i];
    }
    return preview;
  }

  return (
    <button
      onClick={() => {
        setSelectedListID(listID);
        setDisplayedPage('itemsDisplay');
      }}
      className="w-full text-left max-w-[90%]"
    >
      <div className="flex flex-row items-baseline gap-2">
        <div className="text-lg font-bold">{list.title}</div>
        <div className="text-xs text-gray-500 truncate">{itemsPreview(list.itemsList.size, itemNames)}</div>
      </div>
    </button>
  );
}

OpenListButton.propTypes = {
  listID: PropTypes.string,
  list: PropTypes.object,
};

export default OpenListButton;
