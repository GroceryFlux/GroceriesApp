import React from "react"
import { useDisplayedMenuStore } from "../../store/displayedMenu/displayedMenu"


function ReturnToListsFromShoppingButton() {

  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu)

  return(
    <button
      onClick={() => 
        setDisplayedMenu('listsDisplay')
      }
      className="text-1xl font-bold"
      type="button"
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  )
}

export default ReturnToListsFromShoppingButton