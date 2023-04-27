import React, { useState } from 'react';
import { filterLists } from '../utils/filterValue.utils';
import { sortBy } from '../utils/timeStampAndSortBy';
import { useThemeStore } from '../store/theme/theme';
import { useSelectedListStore } from '../store/selectedList/selectedList';
import { useListsStore } from '../store/lists/lists';
import { useDisplayedMenuStore } from '../store/displayedMenu/displayedMenu';


function ListsDisplay() {
  const [filterValue, setFilterValue] = useState('');
  const [sortType, setSortType] = useState('')
  const [listToDelete, setListToDelete] = useState(null);

  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme) 
  const setSelectedList = useSelectedListStore((state) => state.setSelectedList)
  const existingLists = useListsStore((state) => state.existingLists)
  const saveExistingLists = useListsStore((state) => state.saveExistingLists)
  const deleteList = useListsStore((state) => state.deleteList)
  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu)
  


  return (
    <div className="w-3/4">
      <div className="flex items-center justify-around mt-4 mb-8">
        <div className="mt-0.5">
          <button 
            onClick={toggleTheme}
            className=""
          >
            {theme === 'dark' ? <i className="fa-regular fa-moon"></i> : <i className="fa-regular fa-sun"></i>}
          </button>
        </div>
        <div className="">
          <h1 className="font-medium text-2xl text-center">Groceries</h1>
        </div>
        <div className="self-end">
          <button
            className="text-xl"
            onClick={() => setDisplayedMenu('shoppingListDisplay')}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
      <div className="flex gap-4 my-4">
        <div className="text-lg">
          Recurrent lists
        </div>
        <button 
          className="text-xl"
          onClick={() => 
          {
            const listID = crypto.randomUUID();
            const list = { title: '', timeStamp: undefined, itemsList: new Map() };
            saveExistingLists(listID, list);
            setSelectedList(listID);
            setDisplayedMenu('itemsDisplay')
          }}
        >
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-3 mb-4">
          <input
            placeholder="Search"
            className={`border text-center rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
            onChange={(event) => setFilterValue(event.target.value)}
          ></input>
          <div className={`${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}>
            <select 
              id="selectSortBy" 
              name="selectSortBy" 
              defaultValue="sort" 
              onChange={(event) => setSortType(event.target.value)}
              className={`w-14 ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
            >
              <option value="sort" disabled>Sort</option>
              <option value="last_modified">Date</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>

        <div className="">
          <ul>
            {filterLists(filterValue, sortBy(sortType, existingLists)).map(([listID, list]) => (
              <li key={listID} className="mb-1">
                <div className="flex flex-row justify-between">
                  <button
                    onClick={() => {
                      setDisplayedMenu('itemsDisplay')
                      setSelectedList(listID);
                    }}
                  >
                    {list.title}
                  </button>
                  <div>
                    { listToDelete === listID ?
                      <div className="flex gap-4">
                        <button onClick={() => deleteList(listID)}>
                          <i className="fa-regular fa-square-check text-red-400"></i>
                        </button>
                        <button onClick={() => setListToDelete(null)}>
                          <i className="fa-regular fa-rectangle-xmark text-green-400"></i> 
                        </button>
                      </div>
                      :
                      <button 
                        className="text-red-400 min-w-[3rem]"
                        onClick={() => setListToDelete(listID)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListsDisplay;
