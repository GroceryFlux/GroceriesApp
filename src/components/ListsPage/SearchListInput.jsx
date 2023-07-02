import React from 'react';
// import { useThemeStore } from '../../store/theme/theme';
import { useListFilterStore } from '../../store/filtersAndSortBy/listFilter';
import { MagnifyingGlassIcon /*XIcon*/ } from '../Icons/index.js';

function SearchListInput() {
  // const theme = useThemeStore((state) => state.theme);
  // const setListFilter = useListFilterStore((state) => state.setListFilter);
  // const listFilter = useListFilterStore((state) => state.listFilter);
  // const resetListFilter = useListFilterStore((state) => state.resetListFilter);
  // const displayListFilter = useListFilterStore((state) => state.displayListFilter);
  const setDisplayListFilter = useListFilterStore((state) => state.setDisplayListFilter);

  return (
    <>
      <button
        className="text-spurple"
        onClick={() => setDisplayListFilter()}
      >
        <MagnifyingGlassIcon />
      </button>

      {/*<div className={`flex grow shrink pr-4 ${displayListFilter ? 'visible' : 'invisible'}`}>*/}
      {/*  <div className={`flex grow shrink border rounded-lg`}>*/}
      {/*    <input*/}
      {/*      placeholder="Search"*/}
      {/*      className={`grow shrink w-2 outline-none rounded-lg text-center */}
      {/*      ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}*/}
      {/*      onChange={(event) => setListFilter(event.target.value)}*/}
      {/*      value={listFilter}*/}
      {/*    />*/}
      {/*    <button onClick={() => resetListFilter()}>*/}
      {/*      <XIcon />*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}

export default SearchListInput;
