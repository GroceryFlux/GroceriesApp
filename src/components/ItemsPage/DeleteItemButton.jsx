import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../store/lists/lists';

function DeleteItemButton({ itemID }) {
  const listID = useListsStore((state) => state.selectedListID);
  const deleteItem = useListsStore((state) => state.deleteItem)

  return (
    <div
      className="text-red-400 text-center"
      onClick={() => deleteItem(listID, itemID)}
    >
      <i className="fa-solid fa-trash"></i>
    </div>
  );
}

DeleteItemButton.propTypes = {
  itemID: PropTypes.string,
};

export default DeleteItemButton;
