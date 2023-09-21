import React from 'react';
import { useItemFilterStore } from '../../store/filtersAndSortBy/itemFilter';
import { MagnifyingGlassIcon } from '../Icons';

function SearchItemButton() {
  const toggleItemFilter = useItemFilterStore((state) => state.toggleItemFilter);
  return (
    <button
      className="text-primary"
      onClick={() => toggleItemFilter()}
      type="button"
    >
      <MagnifyingGlassIcon />
    </button>
  );
}

export default SearchItemButton;
