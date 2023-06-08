import { React } from 'react';
import { usePageStore } from '../../../store/displayedMenu/displayedMenu';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function OpenListButton({ listID, title }) {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const setSelectedListID = useListsStore((state) => state.setSelectedListID);

  return (
    <button
      onClick={() => {
        setSelectedListID(listID);
        setDisplayedPage('itemsDisplay');
      }}
    >
      {title}
    </button>
  );
}

OpenListButton.propTypes = {
  listID: PropTypes.string,
  title: PropTypes.string,
};

export default OpenListButton;
