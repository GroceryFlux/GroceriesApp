import React from 'react';
import PropTypes from 'prop-types';
import { TrashIcon } from '../../Icons';
import { useSelectedListStore } from '../../../UseCases/SelectedList/Store';
import { deleteItemFromList } from '../../../UseCases/ExistingLists/BusinessLogic';

function DeleteItemButton({ itemID }) {
  const listID = useSelectedListStore((state) => state.selectedListID);

  return (
    <button
      className="text-red-500/70"
      onClick={() => deleteItemFromList({ listID, itemID })}
    >
      <TrashIcon />
    </button>
  );
}

DeleteItemButton.propTypes = {
  itemID: PropTypes.string,
};

export default DeleteItemButton;
