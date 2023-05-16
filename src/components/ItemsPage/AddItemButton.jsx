import React from 'react';

function AddItemButton() {
  return (
    <button
      type="submit"
      className="border-solid border-y-2 border-r-2 rounded-r-lg border-blue-400 text-blue-400 p-1"
    >
      &nbsp;<i className="fa-solid fa-circle-plus"></i>
    </button>
  );
}

export default AddItemButton;
