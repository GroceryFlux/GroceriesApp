import React from 'react';
import { useItemFilterStore } from '../../store/filtersAndSortBy/itemFilter';
import { XIcon } from '../Icons';

function SearchItemInput() {
  const setItemFilter = useItemFilterStore((state) => state.setItemFilter);
  const itemFilter = useItemFilterStore((state) => state.itemFilter);
  const resetItemFilter = useItemFilterStore((state) => state.resetItemFilter);
  const showItemFilter = useItemFilterStore((state) => state.showItemFilter)

  return (
    <div className={`flex -mt-1 ${showItemFilter ? 'visible' : 'invisible'}`}>
      <div className="flex grow shrink border border-accent rounded-xl bg-neutral">
        <input
          placeholder="Looking for an item ?"
          className="grow shrink placeholder:text-sm outline-none rounded-xl bg-neutral pl-2"
          onChange={(event) => setItemFilter(event.target.value)}
          value={itemFilter}
        />
        <button onClick={() => resetItemFilter()}>
          <XIcon />
        </button>
      </div>
    </div>
  );
}

export default SearchItemInput;
