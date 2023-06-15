import React from 'react';
import { useThemeStore } from '../../store/theme/theme';
import { useListFilterStore } from '../../store/filtersAndSortBy/listFilter';

function SearchListInput() {
  const theme = useThemeStore((state) => state.theme);
  const setListFilter = useListFilterStore((state) => state.setListFilter);
  const listFilter = useListFilterStore((state) => state.listFilter);
  const resetListFilter = useListFilterStore((state) => state.resetListFilter);

  return (
    <div className={`border rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}>
      <input
        placeholder="Search"
        className={`outline-none ml-1 text-center ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
        onChange={(event) => setListFilter(event.target.value)}
        value={listFilter}
      />
      <i
        className="mx-1 text-sm fa-solid fa-circle-xmark justify-center"
        onClick={() => resetListFilter()}
      ></i>
    </div>
  );
}

export default SearchListInput;
