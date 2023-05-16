import React from 'react';
import { useThemeStore } from '../../store/theme/theme';
import { useFilterStore } from '../../store/filtersAndSortBy/filters';

function SearchListInput() {
  const theme = useThemeStore((state) => state.theme);
  const setListFilter = useFilterStore((state) => state.setListFilter);
  const listFilter = useFilterStore((state) => state.listFilter);
  const resetListFilter = useFilterStore((state) => state.resetListFilter);

  return (
    <div className={`border rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}>
      <input
        placeholder="Search"
        className={`ml-1 text-center ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
        onChange={(event) => setListFilter(event.target.value)}
        value={listFilter}
      ></input>
      <i
        className="mx-1 text-sm fa-solid fa-circle-xmark justify-center"
        onClick={() => resetListFilter()}
      ></i>
    </div>
  );
}

export default SearchListInput;
