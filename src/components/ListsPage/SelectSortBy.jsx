import React from "react";
import { useThemeStore } from "../../store/theme/theme";
import { useSortByStore } from "../../store/filtersAndSortBy/sortBy";

function SelectSortBy() {

  const theme = useThemeStore((state) => state.theme)
  const setSortType = useSortByStore ((state) => state.setSortType)
  const sortType = useSortByStore((state) => state.sortType)


  return(
    <select 
      id="selectSortBy" 
      name="selectSortBy" 
      defaultValue={sortType} 
      onChange={(event) => setSortType(event.target.value)}
      className={`w-14 ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
    >
      <option value="sort" disabled>Sort</option>
      <option value="last_modified">Date</option>
      <option value="alphabetical">A-Z</option>
    </select>
  )
}

export default SelectSortBy