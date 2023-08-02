import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';
import { TrashIcon } from '../../Icons';

function DeleteItemButton({ itemID }) {
  const listID = useListsStore((state) => state.selectedListID);
  const deleteItem = useListsStore((state) => state.deleteItem);

  return (
    <button
      className="text-red-500/70"
      onClick={() => deleteItem(listID, itemID)}
    >
      <TrashIcon />
    </button>
  );
}

DeleteItemButton.propTypes = {
  itemID: PropTypes.string,
};

export default DeleteItemButton;
