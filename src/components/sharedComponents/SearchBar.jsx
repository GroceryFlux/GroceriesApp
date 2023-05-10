import React from "react";
import { useThemeStore } from "../../store/theme/theme";
import { useFilterStore } from "../../store/filtersAndSortBy/filters";

function SearchBar() {

  const theme = useThemeStore((state) => state.theme)
  const setFilter = useFilterStore((state) => state.setFilter)
  const filter = useFilterStore((state) => state.filter)
  const resetFilters = useFilterStore((state) => state.resetFilters)


  return(
    <div className={`border rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}>
      <input
        placeholder="Search"
        className={`ml-1 text-center ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
        onChange={(event) => setFilter(event.target.value)}
        value={filter}
      ></input>
      <i 
        className="mx-1 text-sm fa-solid fa-circle-xmark justify-center"
        onClick={() => resetFilters()}
      ></i>
    </div>
  )

}

export default SearchBar
