import React from "react"
import PropTypes from "prop-types";
import { useThemeStore } from "../../store/theme/theme";
import { useSelectedListStore } from "../../store/selectedList/selectedList";
import { useListsStore } from "../../store/lists/lists";


function ModifyItemInput({ itemID, item }) {

  const theme = useThemeStore((state) => state.theme)
  const listID = useSelectedListStore((state) => state.selectedList)
  const list = useListsStore((state) => state.existingLists).get(listID)
  const shoppingList = useListsStore((state) => state.shoppingList)
  const saveExistingLists = useListsStore((state) => state.saveExistingLists)

  return(
    <div className="flex flex-row"> 
      <input
        className={`${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
        onBlur={(event) => {
          item.itemName = event.target.value;
          list.timeStamp = Date.now();
          shoppingList.set(itemID, item)
          saveExistingLists(listID, list);
        }}
        defaultValue={item.itemName}
      />
    </div>
  )
}

ModifyItemInput.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object
}

export default ModifyItemInput