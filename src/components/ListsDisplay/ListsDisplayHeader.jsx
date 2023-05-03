import React from "react"
import { useThemeStore } from "../../store/theme/theme"
import { PropTypes } from "prop-types"


function ListsDisplayHeader({ setDisplayedMenu }) {

  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const theme = useThemeStore((state) => state.theme)

  return(
    <div className="flex items-center justify-around mt-4 mb-8">
      <div className="mt-0.5">
        <button 
          onClick={toggleTheme}
          className=""
        >
          {theme === 'dark' ? <i className="fa-regular fa-moon"></i> : <i className="fa-regular fa-sun"></i>}
        </button>
      </div>
      <div className="">
        <h1 className="font-medium text-2xl text-center">Groceries</h1>
      </div>
      <div className="self-end">
        <button
          className="text-xl"
          onClick={() => setDisplayedMenu('shoppingListDisplay')}
        >
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  )
}

ListsDisplayHeader.propTypes = {
  setDisplayedMenu: PropTypes.func
}

export default ListsDisplayHeader