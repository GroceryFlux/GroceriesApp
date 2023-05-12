import React from "react";
import { useThemeStore } from "../../store/theme/theme";
import { useFilterStore } from "../../store/filtersAndSortBy/filters";

function SearchItemInput() {

  const theme = useThemeStore((state) => state.theme)
  const setItemFilter = useFilterStore((state) => state.setItemFilter)
  const itemFilter = useFilterStore((state) => state.itemFilter)
  const resetItemFilter = useFilterStore((state) => state.resetItemFilter)


  return(
    <div className={`border rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}>
      <input
        placeholder="Search"
        className={`ml-1 text-center ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
        onChange={(event) => setItemFilter(event.target.value)}
        value={itemFilter}
      ></input>
      <i 
        className="mx-1 text-sm fa-solid fa-circle-xmark justify-center"
        onClick={() => resetItemFilter()}
      ></i>
    </div>
  )

}

export default SearchItemInput