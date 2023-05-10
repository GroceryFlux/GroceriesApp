import React from "react";
import PropTypes from "prop-types"

function DeleteButton({ deleteFunction, deleteID }) {


  return(
    <button 
      className="text-red-400 min-w-[3rem]"
      onClick={() => deleteFunction(deleteID)}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  )
}

DeleteButton.propTypes = {
  deleteFunction: PropTypes.func,
  deleteID: PropTypes.string
}

export default DeleteButton