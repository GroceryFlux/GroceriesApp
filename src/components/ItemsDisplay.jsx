import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { filterItems } from '../utils/filterValue.utils';
import { toDate, toTime } from '../utils/timeStampAndSortBy';
import { setLocalShoppingList } from '../utils/localStorage.utils';

function ItemsDisplay({ setIsItemsDisplayVisible, selectedList, saveList, theme, shoppingList, deleteList }) {
  const [listID, list] = selectedList;
  const [filterValue, setFilterValue] = useState('');
  const [isItemEmpty, setIsItemEmpty] = useState(false)
  const [isTitleEmpty, setIsTitleEmpty] = useState(list.title != '' ? false : true)
  const [displayWarning, setDisplayWarning] = useState(false)

  return (
    <>
      <div className="flex justify-between pt-5 mb-5">
        <button
          onClick={() => 
            list.title != '' ? setIsItemsDisplayVisible(false) : setDisplayWarning(true)
          }
          className="text-1xl font-bold min-w-[4rem]"
          type="button"
        >
          {displayWarning === true ? <i className="fa-solid fa-circle-exclamation text-red-400"></i> : <i className="fa-solid fa-chevron-left"></i>}
        </button>
        <input
          placeholder="Add title"
          defaultValue={list.title}
          className={`focus:outline-none border-solid border-2 text-center text-2xl rounded-lg ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''} ${isTitleEmpty === true ? 'border-red-400' : null}`}
          onBlur={(event) => {
            event.target.value != list.title ? (
              list.title = event.target.value,
              list.timeStamp = Date.now(),
              saveList(listID, list)
            ) : null
          }}
          onSelect={(event) => event.target.value != '' ? 
            isTitleEmpty === false ? null 
              : (setIsTitleEmpty(false), displayWarning != false ? setDisplayWarning(false) : null)
            : setIsTitleEmpty(true)
          }
        ></input>
        {displayWarning === true ? 
          <div className="flex justify-center min-w-[4rem] gap-2">
            <button onClick={() => {
              list.title = 'No title'
              list.timeStamp = Date.now()
              saveList(listID, list)
              setIsItemsDisplayVisible(false)
            }}>
              <i className="fa-regular fa-square-check text-green-400"></i>
            </button>
            <button onClick={() => {
              setIsItemsDisplayVisible(false)
              deleteList(listID)
            }}>
              <i className="fa-regular fa-rectangle-xmark text-red-400"></i> 
            </button>
          </div>
          : <div className="min-w-[4rem]"/>
        }   
      </div>
      <div className="flex justify-center mb-2">
        {list.timeStamp === undefined ? 
          displayWarning === true ? <h3 className="text-xs text-red-400 text-center">There is no title! Please confirm, add a title or delete the list</h3> 
            : <h3 className="text-center italic text-xs">Start adding items to your list</h3> 
          : <h3 className="text-center italic text-xs">Last modified on {toDate(list.timeStamp)} at {toTime(list.timeStamp)}</h3>
        }
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.target[0].value != '' ? (
            list.itemsList.set(crypto.randomUUID(), { itemName: event.target[0].value, quantity: event.target[1].value, unit: event.target[2].value, addToShoppingList: false, isBought: false }),
            list.timeStamp = Date.now(),
            saveList(listID, list),
            event.target[0].value = '',
            event.target[1].value = '',
            event.target[2].value = ''
          ) : null
        }}
      >
        <div className={`flex justify-center my-4`}>
          <div               
            className={`gap-1 max-w-[85%] border-solid border-2 rounded-lg ${isItemEmpty === true ? 'border-red-400' : null}`}
          >
            <input
              className={`focus:outline-none w-[55%] text-center ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
              placeholder="Add item"
              defaultValue=""
              onSelect={(event) => event.target.value != '' ? 
                // doing this to avoid having the state changing too often
                isItemEmpty === false ? null 
                  : setIsItemEmpty(false) 
                : setIsItemEmpty(true)}
              onBlur={() => setIsItemEmpty(false)}
            />
            <input 
              className={`focus:outline-none w-[15%] text-center ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
              placeholder="Qty."  
            ></input>
            <input
              className={`focus:outline-none w-[15%] text-center ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
              placeholder="Unit"
            ></input>
            <button 
              type="submit"
              className= "p-1 w-[15%]"
            >
              <i className="fa-solid fa-circle-plus"></i>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <input
            placeholder="Search"
            className={`focus:outline-none border text-center rounded-lg ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
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
                  {item.quantity === '' ? null : 
                    <input
                      className={`${`w-[${item.quantity.length}ch]`} focus:outline-none ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
                      defaultValue={item.quantity}
                    ></input>
                  } 
                  {item.unit === '' ? null : 
                    <input
                      className={`${`w-[${item.unit.length}ch]`} focus:outline-none ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
                      defaultValue={item.unit}
                    ></input>
                  }
                  <input
                    className={`focus:outline-none ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}
                    onBlur={(event) => {
                      event.target.value != item.itemName ? (
                        item.itemName = event.target.value,
                        list.timeStamp = Date.now(),
                        shoppingList.set(itemID, item),
                        saveList(listID, list)
                      ) : null
                    }}
                    defaultValue={item.itemName}
                  />
                </div>
                <div className="flex flew-row">
                  <div 
                    className="mr-3"
                    onClick={() => {
                      item.addToShoppingList === false ? (
                        shoppingList.set(itemID, { ... item, listID: listID, addToShoppingList: true, isBought: false }),
                        list.itemsList.set(itemID, { ...item, addToShoppingList: true })
                      ) 
                        : (
                          list.itemsList.set(itemID, { ...item, isBought: false, addToShoppingList: false }), 
                          shoppingList.delete(itemID)
                        )
                      saveList(listID, list)
                      setLocalShoppingList(shoppingList)
                    }}
                  >
                    {item.isBought === true ?
                      <i className="fa-solid fa-check-double"></i>
                      : item.addToShoppingList === true ? <i className="fa-solid fa-check"></i>
                        : <i className="fa-solid fa-plus"></i>
                    }
                  </div>
                  <div
                    className="text-red-400 text-center"
                    onClick={() => {
                      list.itemsList.delete(itemID);
                      list.timeStamp = Date.now()
                      shoppingList.delete(itemID)
                      saveList(listID, list);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </div>
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
  deleteList: PropTypes.func,
};

export default ItemsDisplay;
