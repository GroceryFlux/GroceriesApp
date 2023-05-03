import React from "react";
import PropTypes from "prop-types"
import { useThemeStore } from "../../store/theme/theme";

function SearchBar({ setFilterValue }) {

  const theme = useThemeStore((state) => state.theme)

  return(
    <input
      placeholder="Search"
      className={`border text-center rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
      onChange={(event) => setFilterValue(event.target.value)}
    ></input>
  )

}

SearchBar.propTypes = {
  setFilterValue: PropTypes.func
}

export default SearchBar
