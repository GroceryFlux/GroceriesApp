import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { toDate } from '../../utils/timeStampAndSortBy';

function LastModifiedText() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);

  return (
    <div className="-mt-1.5">
      {list.timeStamp === undefined ? (
        <h3 className="text-center italic text-xs">Start adding items to your list</h3>
      ) : (
        <h3 className="text-center italic text-xs text-gray-500">Last modified{toDate(list.timeStamp)}</h3>
      )}
    </div>
  );
}

export default LastModifiedText;
