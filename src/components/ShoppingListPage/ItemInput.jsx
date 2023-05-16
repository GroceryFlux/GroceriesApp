import React from "react"
import PropTypes from "prop-types"
import { useThemeStore } from "../../store/theme/theme"


function ItemInput({ item }) {

  const theme = useThemeStore((state) => state.theme)

  return(
    <div>
      <input
        className={`${theme === 'dark' ? 'bg-slate-700 text-slate-200' : 'bg-white'}`}
        defaultValue={item.itemName}
        disabled
      />
    </div>
  )
}

ItemInput.propTypes = {
  item: PropTypes.object
}

export default ItemInput