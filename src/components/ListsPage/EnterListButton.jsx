import { React } from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import PropTypes from 'prop-types';
import { useListsStore } from '../../store/lists/lists';

function EnterListButton({ listID, title }) {
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

EnterListButton.propTypes = {
  listID: PropTypes.string,
  title: PropTypes.string,
};

export default EnterListButton;
