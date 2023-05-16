import React from "react"
import PropTypes from "prop-types"
import { useListsStore } from "../../store/lists/lists"

function IsBoughtToggleButton({ itemID, item }) {

  const saveShoppingList = useListsStore((state) => state.saveShoppingList)

  return(
    <div className="flex flex-row gap-2">
      <div 
        onClick={() => {
          saveShoppingList(itemID, { ...item, isBought: !item.isBought })
        }}>
        {item.isBought === true ? 
          <i className="fa-solid fa-circle-check"></i>
          :
          <i className="fa-regular fa-circle"></i>
        }
      </div>
    </div>
  )
}

IsBoughtToggleButton.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object
}

export default IsBoughtToggleButton