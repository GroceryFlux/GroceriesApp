import React, { useState } from 'react';
import { SortIcon } from '../Icons';
import { useSortByStore } from '../../store/filtersAndSortBy/sortBy';
import { useThemeStore } from '../../store/theme/theme';

function SelectSorting() {
  const [showDropdown, setShowDropdown] = useState(false);

  const setSortType = useSortByStore((state) => state.setSortType);
  const sortType = useSortByStore((state) => state.sortType);
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="relative inline-block text-primary pt-1">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <SortIcon />
      </button>

      {showDropdown && (
        <div
          className={`w-[5rem] absolute z-10 left-0 border-solid border-2 rounded-lg 
      ${theme === 'dark' ? 'bg-slate-600 border-indigo-700' : 'bg-slate-100 border-indigo-300'} 
        `}
        >
          <ul>
            <li
              className={`px-2 py-1 rounded-t-lg
            ${sortType === 'last_modified' && theme === 'dark' ? 'bg-slate-500' : ''}
          `}
            >
              <button
                onClick={() => setSortType('last_modified')}
                className="w-full"
              >
                Date
              </button>
            </li>
            <li
              className={`px-2 py-1 rounded-b-lg
            ${sortType === 'alphabetical' && theme === 'dark' ? 'bg-slate-500' : ''}
          `}
            >
              <button
                onClick={() => setSortType('alphabetical')}
                className="w-full"
              >
                A-Z
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectSorting;
