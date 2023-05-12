import React from "react"
import { useSelectedListStore } from "../../store/selectedList/selectedList";
import { useListsStore } from "../../store/lists/lists";
import { useThemeStore } from "../../store/theme/theme";


function ListTitleInput() {

  const theme = useThemeStore((state) => state.theme)
  const listID = useSelectedListStore((state) => state.selectedList)
  const list = useListsStore((state) => state.existingLists).get(listID)
  const saveExistingLists = useListsStore((state) => state.saveExistingLists)

  return(
    <input
      placeholder="Title"
      defaultValue={list.title}
      className={`border-solid border-2 border-blue-400 text-center text-2xl rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
      onBlur={(event) => {
        list.title = event.target.value;
        list.timeStamp = Date.now();
        saveExistingLists(listID, list);
      }}
    ></input>
  )
}

export default ListTitleInput