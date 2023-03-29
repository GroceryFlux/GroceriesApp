import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setLocalExistingLists, setLocalShoppingList } from '../utils/localStorage.utils';

function ShoppingListDisplay({ setIsShoppingListVisible, theme, shoppingList, setShoppingList, saveShoppingList, existingLists }) {

  const [displayCompleted, setDisplayCompleted] = useState(true)
  
  return(

    <>
      <div className="flex items-center justify-around mt-4 mb-8 w-3/4">
        <div>
          <button
            onClick={() => 
              setIsShoppingListVisible(false)
            }
            className="text-1xl font-bold"
            type="button"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        </div>
        <div>
          <h1 className="font-medium text-2xl text-center">Shopping list</h1>
        </div>
        <div 
          onClick={() => {
            [...shoppingList.entries()].forEach(([itemID, item]) => 
              existingLists.set(item.listID, { ...existingLists.get(item.listID), itemsList: existingLists.get(item.listID).itemsList.set(itemID, { ...item, addToShoppingList: false, isBought: false }) })
            )
            setLocalExistingLists(existingLists)
            setShoppingList(new Map())
            setLocalShoppingList(new Map())
          }}
        >
          <i className="fa-regular fa-circle-xmark text-xl"></i>
        </div>
      </div>
      {shoppingList.size === 0 | shoppingList.length === 0 ? 
        <p className="w-3/4">Your shopping list is empty, please start adding items in your reccurent lists</p>
        :
        <>
          <h2>Basket</h2>
          <ul className="mb-3 mt-3">
            {[...shoppingList.entries()].map(([itemID, item]) => (
              !existingLists.has(item.listID) ? shoppingList.delete(itemID) 
                :
                item.isBought === false ?
                  <li key={itemID}>
                    <div className="flex flex-row gap-2">
                      <div onClick={() => {
                        saveShoppingList(itemID, { ...item, isBought: true })
                        existingLists.set(item.listID, { ...existingLists.get(item.listID), itemsList: existingLists.get(item.listID).itemsList.set(itemID, { ...item, isBought: true }) })
                      }}>
                        <i className="fa-regular fa-circle"></i>
                      </div>
                      <div>
                        <input
                          className={`${theme === 'Light' ? 'bg-slate-700 text-slate-200' : 'bg-white'}`}
                          defaultValue={item.itemName}
                          disabled
                        />
                      </div>
                    </div>
                  </li> : null
            ))}
          </ul>
          <div className="flex flex-row gap-3">
            <h2>Completed</h2>
            <div onClick={() => setDisplayCompleted(!displayCompleted)}>
              {displayCompleted === false ? 
                <i className="fa-solid fa-chevron-up"></i> 
                : <i className="fa-solid fa-chevron-down"></i>}
            </div>
          </div>
          {displayCompleted === true ? 
            <ul className="mb-3 mt-3">
              {[...shoppingList.entries()].map(([itemID, item]) => (
                !existingLists.has(item.listID) ? shoppingList.delete(itemID) 
                  :
                  item.isBought === true ?
                    <li key={itemID}>
                      <div className="flex flex-row gap-2">
                        <div 
                          onClick={() => {
                            saveShoppingList(itemID, { ...item, isBought: false })
                            existingLists.set(shoppingList.get(itemID).listID, { ...existingLists.get(shoppingList.get(itemID).listID), itemsList: existingLists.get(shoppingList.get(itemID).listID).itemsList.set(itemID, { ...item, isBought: false }) })
                          }}>
                          <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <div className="">
                          <input
                            className={`${theme === 'Light' ? 'bg-slate-700 text-slate-200' : 'bg-white'}`}
                            defaultValue={item.itemName}
                            disabled
                          />
                        </div>
                      </div>
                    </li> : null
              ))}
            </ul>
            : null}
        </>
      }
    </>
  )
}

ShoppingListDisplay.propTypes = {
  setIsShoppingListVisible: PropTypes.func,
  theme: PropTypes.string,
  shoppingList: PropTypes.object,
  saveShoppingList: PropTypes.func,
  setShoppingList: PropTypes.func,
  existingLists: PropTypes.object,
}

export default ShoppingListDisplay