import React from "react";
import PropTypes from "prop-types"
import { useThemeStore } from "../../store/theme/theme";

function SelectSortBy({ setSortType }) {

  const theme = useThemeStore((state) => state.theme)

  return(
    <select 
      id="selectSortBy" 
      name="selectSortBy" 
      defaultValue="sort" 
      onChange={(event) => setSortType(event.target.value)}
      className={`w-14 ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
    >
      <option value="sort" disabled>Sort</option>
      <option value="last_modified">Date</option>
      <option value="alphabetical">A-Z</option>
    </select>
  )
}

SelectSortBy.propTypes = {
  setSortType: PropTypes.func
}

export default SelectSortBy