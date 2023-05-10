import { React } from "react"
import { useDisplayedMenuStore } from "../../store/displayedMenu/displayedMenu";
import { useSelectedListStore } from "../../store/selectedList/selectedList";
import PropTypes from "prop-types";

function EnterListButton({ listID, title }) {

  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu)
  const setSelectedList = useSelectedListStore((state) => state.setSelectedList)

  return(
    <button
      onClick={() => {
        setDisplayedMenu('itemsDisplay')
        setSelectedList(listID);
      }}
    >
      {title}
    </button>
  )
}

EnterListButton.propTypes = {
  listID: PropTypes.string,
  title: PropTypes.string
}

export default EnterListButton