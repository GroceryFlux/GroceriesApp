import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function DeleteListButton({ listID }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteList = useListsStore((state) => state.deleteList);

  if (confirmDelete) {
    return (
      <div className="flex gap-4">
        <button onClick={() => deleteList(listID)}>
          <i className="fa-regular fa-square-check text-red-400"></i>
        </button>
        <button onClick={() => setConfirmDelete(false)}>
          <i className="fa-regular fa-rectangle-xmark text-green-400"></i>
        </button>
      </div>
    );
  }

  return (
    <button
      className="text-red-400 min-w-[3rem]"
      onClick={() => setConfirmDelete(true)}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  );
}

DeleteListButton.propTypes = {
  listID: PropTypes.string,
};

export default DeleteListButton;
