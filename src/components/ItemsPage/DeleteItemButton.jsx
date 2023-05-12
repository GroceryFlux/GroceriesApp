import React from "react"
import PropTypes from "prop-types"
import { useSelectedListStore } from "../../store/selectedList/selectedList";
import { useListsStore } from "../../store/lists/lists";


function DeleteItemButton({ itemID }) {

  const listID = useSelectedListStore((state) => state.selectedList)
  const list = useListsStore((state) => state.existingLists).get(listID)
  const shoppingList = useListsStore((state) => state.shoppingList)
  const saveExistingLists = useListsStore((state) => state.saveExistingLists)

  return(
    <div
      className="text-red-400 text-center"
      onClick={() => {
        list.itemsList.delete(itemID);
        list.timeStamp = Date.now()
        shoppingList.delete(itemID)
        saveExistingLists(listID, list);
      }}
    >
      <i className="fa-solid fa-trash"></i>
    </div>
  )
}

DeleteItemButton.propTypes = {
  itemID: PropTypes.string
}

export default DeleteItemButton