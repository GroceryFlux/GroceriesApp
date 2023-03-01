import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { filterItems } from '../utils/filterValue.utils';

function ItemsDisplay({ setIsModalVisible, selectedList, saveList, theme }) {
  const [listID, list] = selectedList;
  const [filterValue, setFilterValue] = useState('');

  let lastModified = new Date(list.timeStamp)

  return (
    <>
      <div className="flex justify-between px-3 pt-5 mb-5">
        <button
          onClick={() => setIsModalVisible(false)}
          className="text-1xl font-bold min-w-[5rem]"
          type="button"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <input
          placeholder="Title"
          defaultValue={list.title}
          className={`border-solid border-2 border-blue-400 text-center text-2xl rounded-lg ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
          onBlur={(event) => {
            list.title = event.target.value;
            list.timeStamp = Date.now();
            saveList(listID, list);
          }}
        ></input>
        <div className="min-w-[5rem]"/>
      </div>
      <div className="flex justify-center mb-2">
        {list.timeStamp === undefined ? 
          <h3 className="text-center italic text-xs">Start adding items to your list</h3> 
          : <h3 className="text-center italic text-xs">Last modified on {lastModified.toLocaleDateString("default")} at {lastModified.toLocaleTimeString("default")}</h3>
        }
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          list.itemsList.set(crypto.randomUUID(), { itemName: event.target[0].value });
          list.timeStamp = Date.now();
          saveList(listID, list);
          event.target[0].value = '';
        }}
      >
        <div className="flex flex-col justify-center text-center">
          <h1>Items</h1>
        </div>
        <div className="flex flex-row justify-center text-center my-4">
          <div>
            <input
              className={`text-center border-solid border-y-2 rounded-l-lg border-l-2 border-blue-400 p-1 ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
              placeholder="Bananas"
              defaultValue=""
            />
          </div>
          <div>
            <button 
              type="submit"
              className="border-solid border-y-2 border-r-2 rounded-r-lg border-blue-400 text-blue-400 p-1"
            >
              &nbsp;add
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <input
            placeholder="Filter"
            className={`border text-center rounded-lg ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
            onChange={(event) => setFilterValue(event.target.value)}
          ></input>
        </div>
      </form>
      <div className="mx-5 py-3">
        <ul>
          {filterItems(filterValue, list.itemsList).map(([itemID, item]) => (
            <li key={itemID}>
              <div className="flex flex-row justify-between px-4 py-1">
                <div>
                  O&nbsp;
                  <input
                    className={`${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
                    onBlur={(event) => {
                      item.itemName = event.target.value;
                      list.timeStamp = Date.now();
                      saveList(listID, list);
                    }}
                    defaultValue={item.itemName}
                  />
                </div>
                <div
                  className="text-red-400 min-w-[5rem] text-center"
                  onClick={() => {
                    list.itemsList.delete(itemID);
                    list.timeStamp = Date.now()
                    saveList(listID, list);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

ItemsDisplay.propTypes = {
  setExistingLists: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  existingLists: PropTypes.object,
  selectedList: PropTypes.array,
  selectedID: PropTypes.string,
  saveList: PropTypes.func,
  theme: PropTypes.string,
};

export default ItemsDisplay;
