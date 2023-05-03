import React from "react";
import PropTypes from "prop-types"

function ConfirmDeleteButton({ setListToDelete, deleteList, listID }){

  return(
    <div className="flex gap-4">
      <button onClick={() => deleteList(listID)}>
        <i className="fa-regular fa-square-check text-red-400"></i>
      </button>
      <button onClick={() => setListToDelete(null)}>
        <i className="fa-regular fa-rectangle-xmark text-green-400"></i> 
      </button>
    </div>
  )
}

ConfirmDeleteButton.propTypes = {
  setListToDelete: PropTypes.func,
  deleteList: PropTypes.func,
  listID: PropTypes.string
}

export default ConfirmDeleteButton