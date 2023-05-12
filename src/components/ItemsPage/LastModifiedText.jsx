import React from "react"
import { useSelectedListStore } from "../../store/selectedList/selectedList"
import { useListsStore } from "../../store/lists/lists"
import { toDate, toTime } from "../../utils/timeStampAndSortBy"

function LastModifiedText() {

  const listID = useSelectedListStore((state) => state.selectedList)
  const list = useListsStore((state) => state.existingLists).get(listID)

  return(
    <div className="flex justify-center mb-2">
      {list.timeStamp === undefined ? 
        <h3 className="text-center italic text-xs">Start adding items to your list</h3> 
        : <h3 className="text-center italic text-xs">Last modified on {toDate(list.timeStamp)} at {toTime(list.timeStamp)}</h3>
      }
    </div>
  )
}

export default LastModifiedText