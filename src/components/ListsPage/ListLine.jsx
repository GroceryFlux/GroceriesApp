import React from "react"
import PropTypes from "prop-types"
import { useListToDeleteStore } from "../../store/selectedList/selectedList"
import EnterListButton from "./EnterListButton"
import ConfirmDeleteButton from "./ConfirmDeleteButton"
import DeleteButton from "../sharedComponents/deleteButton"


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
            <DeleteButton 
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