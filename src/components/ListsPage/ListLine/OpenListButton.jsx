import { React } from 'react';
import { usePageStore } from '../../../store/displayedMenu/displayedMenu';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function OpenListButton({ listID, list }) {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const setSelectedListID = useListsStore((state) => state.setSelectedListID);

  const itemsPreview = [...list.itemsList].map(([, item]) => item.itemName).join(', ');

  return (
    <button
      onClick={() => {
        setSelectedListID(listID);
        setDisplayedPage('itemsDisplay');
      }}
      className="w-0 grow text-left"
    >
      <div className="flex flex-row items-baseline gap-2">
        <div className="text-lg font-bold">{list.title}</div>
        <div className="text-xs text-gray-500 truncate">{itemsPreview}</div>
      </div>
    </button>
  );
}

OpenListButton.propTypes = {
  listID: PropTypes.string,
  list: PropTypes.object,
};

export default OpenListButton;
