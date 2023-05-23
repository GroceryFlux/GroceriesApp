import { React } from 'react';
import { useDisplayedMenuStore } from '../../store/displayedMenu/displayedMenu';
import { useSelectedListIDStore } from '../../store/selectedList/selectedList';
import PropTypes from 'prop-types';

function EnterListButton({ listID, title }) {
  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu);
  const setSelectedListID = useSelectedListIDStore((state) => state.setSelectedListID);

  return (
    <button
      onClick={() => {
        setDisplayedMenu('itemsDisplay');
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
