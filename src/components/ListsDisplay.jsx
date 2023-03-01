import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { filterLists } from '../utils/filterValue.utils';
import { sortBy } from '../utils/timeStampAndSortBy';

function ListsDisplay({ setIsModalVisible, setSelectedList, existingLists, saveList, deleteList, theme, setTheme }) {
  const [filterValue, setFilterValue] = useState('');
  const [display, setDisplay] = useState('saved');
  const [sortType, setSortType] = useState('')

  return (
    <>
      <div className="flex flex-col items-center min-w-240">
        <h1 className="font-medium text-4xl text-center mt-6 mb-3">Groceries</h1>
        <button
          className="text-5xl w-20 mt-3 mb-6"
          onClick={() => {
            setIsModalVisible(true);
            const listID = crypto.randomUUID();
            const list = { title: '', timeStamp: undefined, itemsList: new Map() };
            saveList(listID, list);
            setSelectedList([listID, list]);
          }}
        >
          < div className="flex items-center justify-center pb-2">
            <i className="fa-solid fa-cart-plus"></i>
          </div>
        </button>
        <button 
          onClick={() => theme === 'Dark' ? setTheme('Light') : setTheme('Dark')}
        >
          {theme}
        </button>
      </div>
      <div className="flex flex-row justify-around my-3">
        <button 
          className="min-w-[5.5rem]"
          onClick={() => setDisplay('favorites')}
        >
          Favorites
        </button>
        <button 
          className="min-w-[5.5rem]" 
          onClick={() => setDisplay('saved')}
        >
          Saved
        </button>
        <button 
          className="min-w-[5.5rem]"
          onClick={() => setDisplay('grocery-list')}
        >
          Grocery list
        </button>
      </div>
      {display === 'saved' ? 
        <div className="flex flex-col">
          <h1 className="my-2 text-center">My lists</h1>
          <div className="text-center min-w-8">
            <input
              placeholder="Filter"
              className={`border text-center rounded-lg ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
              onChange={(event) => setFilterValue(event.target.value)}
            ></input>
          </div>
          <div className={`mx-5 mt-3 pl-3 rounded-lg ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}>
            <select 
              id="selectSortBy" 
              name="selectSortBy" 
              defaultValue="sort" 
              onChange={(event) => setSortType(event.target.value)}
              className={`${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
            >
              <option value="sort" disabled hidden>Sort your lists</option>
              <option value="last_modified">Last modified</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="date_of_creation">Date of creation</option>
            </select>
          </div>
          <div className="mx-5 mt-3">
            <ul>
              {filterLists(filterValue, sortBy(sortType, existingLists)).map(([listID, list]) => (
                <li key={listID}>
                  <div className="flex flex-row justify-between px-4 py-1">
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
        : 
        <div className="text-center my-10">
          Welcome to groceries, add or browse your grocery lists
        </div>
      }
    </>
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
