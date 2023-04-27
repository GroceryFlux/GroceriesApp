import React, { useState } from 'react';
import { filterItems } from '../utils/filterValue.utils';
import { toDate, toTime } from '../utils/timeStampAndSortBy';
import { useThemeStore } from '../store/theme/theme';
import { useSelectedListStore } from '../store/selectedList/selectedList';
import { useListsStore } from '../store/lists/lists';
import { useDisplayedMenuStore } from '../store/displayedMenu/displayedMenu';

function ItemsDisplay() {
  const [filterValue, setFilterValue] = useState('');

  const theme = useThemeStore((state) => state.theme)
  const listID = useSelectedListStore((state) => state.selectedList)
  const list = useListsStore((state) => state.existingLists).get(listID)
  const shoppingList = useListsStore((state) => state.shoppingList)
  const saveExistingLists = useListsStore((state) => state.saveExistingLists)
  const saveShoppingList = useListsStore((state) => state.saveShoppingList)
  const deleteItemShoppingList = useListsStore((state) => state.deleteItemShoppingList)
  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu)


  return (
    <>
      <div className="flex justify-between px-3 pt-5 mb-5">
        <button
          onClick={() => 
            setDisplayedMenu('listsDisplay')
          }
          className="text-1xl font-bold min-w-[5rem]"
          type="button"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <input
          placeholder="Title"
          defaultValue={list.title}
          className={`border-solid border-2 border-blue-400 text-center text-2xl rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
          onBlur={(event) => {
            list.title = event.target.value;
            list.timeStamp = Date.now();
            saveExistingLists(listID, list);
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
          list.itemsList.set(crypto.randomUUID(), { itemName: event.target[0].value, addToShoppingList: false, isBought: false });
          list.timeStamp = Date.now();
          saveExistingLists(listID, list);
          event.target[0].value = '';
        }}
      >
        <div className="flex flex-row justify-center text-center my-4">
          <div>
            <input
              className={`text-center border-solid border-y-2 rounded-l-lg border-l-2 border-blue-400 p-1 ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
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
            className={`border border-blue-400 text-center rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
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
                  <input
                    className={`${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
                    onBlur={(event) => {
                      item.itemName = event.target.value;
                      list.timeStamp = Date.now();
                      shoppingList.set(itemID, item)
                      saveExistingLists(listID, list);
                    }}
                    defaultValue={item.itemName}
                  />
                </div>
                <div 
                  className="mr-3"
                  onClick={() => {
                    item.addToShoppingList === false ? (
                      saveShoppingList(itemID, { ... item, listID: listID, addToShoppingList: true, isBought: false })
                    ) 
                      : (
                        deleteItemShoppingList(itemID, item)
                      )
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
                    saveExistingLists(listID, list);
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

export default ItemsDisplay;
