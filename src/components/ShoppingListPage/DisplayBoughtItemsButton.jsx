import React from "react"
import { useDisplayBoughtItemsStore } from "../../store/displayedMenu/displayedMenu"

function DisplayBoughtItemsButton() {

  const displayBoughtItems = useDisplayBoughtItemsStore((state) => state.displayBoughtItems)
  const toggleDisplayBoughtItems = useDisplayBoughtItemsStore((state) => state.toggleDisplayBoughtItems)

  return(
    <div onClick={() => toggleDisplayBoughtItems()}>
      {displayBoughtItems === false ? 
        <i className="fa-solid fa-chevron-up"></i> 
        : <i className="fa-solid fa-chevron-down"></i>}
    </div>
  )
}

export default DisplayBoughtItemsButton