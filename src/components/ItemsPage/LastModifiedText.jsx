import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { toDate } from '../../utils/timeStampAndSortBy';

function LastModifiedText() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);

  return (
    <div>
      {list.timeStamp === undefined ? (
        <h3 className="text-center text-xs">&nbsp;</h3>
      ) : (
        <h3 className="text-center text-xs text-slate-500/80">edited {toDate(list.timeStamp)}</h3>
      )}
    </div>
  );
}

export default LastModifiedText;
