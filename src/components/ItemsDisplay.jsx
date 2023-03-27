import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { filterItems } from '../utils/filterValue.utils';
import { toDate, toTime } from '../utils/timeStampAndSortBy';
import { setLocalShoppingList } from '../utils/localStorage.utils';

function ItemsDisplay({ setIsItemsDisplayVisible, selectedList, saveList, theme, shoppingList }) {
  const [listID, list] = selectedList;
  const [filterValue, setFilterValue] = useState('');


  return (
    <>
      <div className="flex justify-between px-3 pt-5 mb-5">
        <button
          onClick={() => 
            setIsItemsDisplayVisible(false)
          }
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
          : <h3 className="text-center italic text-xs">Last modified on {toDate(list.timeStamp)} at {toTime(list.timeStamp)}</h3>
        }
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          list.itemsList.set(crypto.randomUUID(), { itemName: event.target[0].value, addToShoppingList: false });
          list.timeStamp = Date.now();
          saveList(listID, list);
          event.target[0].value = '';
        }}
      >
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
              &nbsp;<i className="fa-solid fa-circle-plus"></i>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <input
            placeholder="Search"
            className={`border border-blue-400 text-center rounded-lg ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
            onChange={(event) => setFilterValue(event.target.value)}
          ></input>
        </div>
      </form>
      <div className="mx-5 py-3">
        <ul>
          {filterItems(filterValue, list.itemsList).map(([itemID, item]) => (
            <li key={itemID}>
              <div className="flex flex-row justify-between py-1">
                <div className="flex flex-row"> 
                  <div
                    onClick={() => {
                      list.itemsList.set(itemID, { ...item, addToShoppingList: !item.addToShoppingList })
                      saveList(listID, list)
                      item.addToShoppingList === false ? 
                        shoppingList.set(itemID, { ... item, listTitle: list.title, addToShoppingList: true }) 
                        : shoppingList.delete(itemID)
                      setLocalShoppingList(shoppingList)
                    }}
                  >
                    {item.addToShoppingList === false ?
                      <i className="fa-regular fa-square-plus text-green-500"></i>
                      : <i className="fa-regular fa-square-minus text-red-500"></i>
                    }
                  </div>
                  &nbsp;&nbsp;&nbsp;
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
                  className="text-red-400 text-center"
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
  setIsItemsDisplayVisible: PropTypes.func,
  selectedList: PropTypes.array,
  selectedID: PropTypes.string,
  saveList: PropTypes.func,
  theme: PropTypes.string,
  shoppingList: PropTypes.object,
};

export default ItemsDisplay;
