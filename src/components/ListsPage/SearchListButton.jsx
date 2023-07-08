import React from 'react';
import { MagnifyingGlassIcon } from '../Icons';
import { useListFilterStore } from '../../store/filtersAndSortBy/listFilter';

function SearchListButton() {
  const toggleListFilter = useListFilterStore((state) => state.toggleListFilter);
  return (
    <button
      className="text-primary"
      onClick={() =>toggleListFilter()}
    >
      <MagnifyingGlassIcon />
    </button>
  );
}

export default SearchListButton;
