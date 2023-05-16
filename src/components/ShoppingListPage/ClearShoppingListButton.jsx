import React from "react"
import { useListsStore } from "../../store/lists/lists"


function ClearShoppingListButton() {

  const deleteCompleteShoppingList = useListsStore((state) => state.deleteCompleteShoppingList)

  return(
    <div>
      <button 
        onClick={() => deleteCompleteShoppingList()}
      >
        <i className="fa-regular fa-circle-xmark text-xl"></i>
      </button>
    </div>
  )
}

export default ClearShoppingListButton