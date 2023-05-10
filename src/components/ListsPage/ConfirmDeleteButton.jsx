import React from "react";
import PropTypes from "prop-types"
import { useListsStore } from "../../store/lists/lists";
import { useListToDeleteStore } from "../../store/selectedList/selectedList";

function ConfirmDeleteButton({ listID }){

  const deleteList = useListsStore((state) => state.deleteList)
  const setListToDelete = useListToDeleteStore((state) => state.setListToDelete)

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
  listID: PropTypes.string
}

export default ConfirmDeleteButton