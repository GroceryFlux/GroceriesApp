import React from 'react';
import { useItemFilterStore } from '../../store/filtersAndSortBy/itemFilter';
import { XIcon } from '../Icons';

function SearchItemInput() {
  const setItemFilter = useItemFilterStore((state) => state.setItemFilter);
  const itemFilter = useItemFilterStore((state) => state.itemFilter);
  const resetItemFilter = useItemFilterStore((state) => state.resetItemFilter);

  return (
    <div className="flex grow shrink">
      <div className="flex border border-accent rounded-xl bg-neutral">
        <input
          placeholder="Looking for an item ?"
          className="placeholder:text-sm outline-none rounded-xl bg-neutral pl-2"
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
