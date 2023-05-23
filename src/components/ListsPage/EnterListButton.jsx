import { React } from 'react';
import { usePageStore } from '../../store/displayedMenu/displayedMenu';
import { useSelectedListIDStore } from '../../store/selectedList/selectedList';
import PropTypes from 'prop-types';

function EnterListButton({ listID, title }) {
  const setDisplayedPage = usePageStore((state) => state.setDisplayedPage);
  const setSelectedListID = useSelectedListIDStore((state) => state.setSelectedListID);

  return (
    <button
      onClick={() => {
        setDisplayedPage('itemsDisplay');
        setSelectedListID(listID);
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
