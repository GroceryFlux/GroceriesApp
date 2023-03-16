import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { filterLists } from '../utils/filterValue.utils';
import { sortBy } from '../utils/timeStampAndSortBy';

function ListsDisplay({ setIsModalVisible, setSelectedList, existingLists, saveList, deleteList, theme, setTheme }) {
  const [filterValue, setFilterValue] = useState('');
  const [sortType, setSortType] = useState('')

  return (
    <div className="w-3/4">
      <div className="flex items-center justify-around mt-4 mb-8">
        <div className="mt-0.5">
          <button 
            onClick={() => theme === 'Dark' ? setTheme('Light') : setTheme('Dark')}
            className=""
          >
            {theme === 'Light' ? <i className="fa-regular fa-moon"></i> : <i className="fa-regular fa-sun"></i>}
          </button>
        </div>
        <div className="">
          <h1 className="font-medium text-2xl text-center">Groceries</h1>
        </div>
        <div className="self-end">
          <button
            className="text-xl"
            onClick={() => console.log('shopping list')}
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
            setIsModalVisible(true);
            const listID = crypto.randomUUID();
            const list = { title: '', timeStamp: undefined, itemsList: new Map() };
            saveList(listID, list);
            setSelectedList([listID, list]);
          }}
        >
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-3 mb-4">
          <input
            placeholder="Search"
            className={`border text-center rounded-lg ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
            onChange={(event) => setFilterValue(event.target.value)}
          ></input>
          <div className={`${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}>
            <select 
              id="selectSortBy" 
              name="selectSortBy" 
              defaultValue="sort" 
              onChange={(event) => setSortType(event.target.value)}
              className={`w-14 ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
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
              list.title === '' ? deleteList(listID) :
                <li key={listID} className="mb-1">
                  <div className="flex flex-row justify-between">
                    <button
                      onClick={() => {
                        setIsModalVisible(true);
                        setSelectedList([listID, list]);
                      }}
                    >
                      {list.title}
                    </button>
                    <button 
                      className="text-red-400 min-w-[3rem]"
                      onClick={() => deleteList(listID)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

ListsDisplay.propTypes = {
  setIsModalVisible: PropTypes.func,
  existingLists: PropTypes.object,
  setSelectedList: PropTypes.func,
  saveList: PropTypes.func,
  deleteList: PropTypes.func,
  theme: PropTypes.string,
  setTheme: PropTypes.func,
};

export default ListsDisplay;
