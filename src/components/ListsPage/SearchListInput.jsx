import React from 'react';
import { useListFilterStore } from '../../store/filtersAndSortBy/listFilter';
import { XIcon } from '../Icons/index.js';

function SearchListInput() {
  const setListFilter = useListFilterStore((state) => state.setListFilter);
  const listFilter = useListFilterStore((state) => state.listFilter);
  const resetListFilter = useListFilterStore((state) => state.resetListFilter);
  const showListFilter = useListFilterStore((state) => state.showListFilter);

  return (
    <>
      <div className={`flex ${showListFilter ? 'visible' : 'invisible'}`}>
        <div className="flex grow shrink border border-accent rounded-xl bg-neutral">
          <input
            placeholder="Looking for a list or an item ?"
            className="grow shrink placeholder:text-sm outline-none rounded-xl bg-neutral pl-2"
            onChange={(event) => setListFilter(event.target.value)}
            value={listFilter}
          />
          <button onClick={() => resetListFilter()}>
            <XIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchListInput;
