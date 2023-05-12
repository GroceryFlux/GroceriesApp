import React from "react"
import PropTypes from "prop-types"
import { useListToDeleteStore } from "../../store/selectedList/selectedList"
import EnterListButton from "./EnterListButton"
import ConfirmDeleteButton from "./ConfirmDeleteButton"
import DeleteListButton from "./DeleteListButton"


function ListLine({ listID, list }) {

  const setListToDelete = useListToDeleteStore((state) => state.setListToDelete)
  const listToDelete = useListToDeleteStore((state) => state.listToDelete)
  
  return(
    <li key={listID} className="mb-1">
      <div className="flex flex-row justify-between">
        <EnterListButton 
          listID={listID}
          title={list.title}
        />
        <div>
          { listToDelete === listID ?
            <ConfirmDeleteButton 
              listID={listID}
            />
            :
            <DeleteListButton
              deleteFunction={setListToDelete}
              deleteID={listID}
            />
          }
        </div>
      </div>
    </li>
  )
}

ListLine.propTypes = {
  listID: PropTypes.string,
  list: PropTypes.object
}

export default ListLine