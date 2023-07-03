import React from 'react';
import { MagnifyingGlassIcon } from '../Icons';
import { useListFilterStore } from '../../store/filtersAndSortBy/listFilter';

function SearchListButton() {
  const setDisplayListFilter = useListFilterStore((state) => state.setDisplayListFilter);
  return (
    <button
      className="text-primary"
      onClick={() => setDisplayListFilter()}
    >
      <MagnifyingGlassIcon />
    </button>
  );
}

export default SearchListButton;
