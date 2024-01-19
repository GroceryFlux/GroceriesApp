import React from 'react';
import { toDate } from '../../utils/timeStampAndSortBy';
import { useSelectedListStore } from '../../UseCases/SelectedList/Store';
import { getList } from '../../UseCases/ExistingLists/Repository';

function LastModifiedText() {
  const listID = useSelectedListStore((state) => state.selectedListID);
  const list = getList(listID);

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
