import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';
import { CancelIcon, ConfirmDeleteIcon, TrashIcon } from '../../Icons';

function DeleteListButton({ listID }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteList = useListsStore((state) => state.deleteList);

  if (confirmDelete) {
    return (
      <div className="flex gap-3">
        <button
          onClick={() => deleteList(listID)}
          className="text-green-400"
        >
          <ConfirmDeleteIcon />
        </button>
        <button
          onClick={() => setConfirmDelete(false)}
          className="text-red-400"
        >
          <CancelIcon />
        </button>
      </div>
    );
  }

  return (
    <button
      className="text-red-500/70"
      onClick={() => setConfirmDelete(true)}
    >
      <TrashIcon />
    </button>
  );
}

DeleteListButton.propTypes = {
  listID: PropTypes.string,
};

export default DeleteListButton;
