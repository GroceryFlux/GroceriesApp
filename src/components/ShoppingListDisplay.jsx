import React from 'react';
import PropTypes from 'prop-types';

function ShoppingListDisplay({ setIsShoppingListVisible, theme, shoppingList, saveShoppingList }) {
 
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
            shoppingList.clear()
            saveShoppingList(shoppingList)
          }}
        >
          <i className="fa-regular fa-circle-xmark text-xl"></i>
        </div>
      </div>
      {shoppingList.size === 0 | shoppingList.length === 0 ? 
        <p className="w-3/4">Your shopping list is empty, please start adding items in your reccurent lists</p>
        :
        <div className="flex flex-row w-3/4">
          <div className="flex flex-col w-1/2 justify-start">
            <h2>Pending</h2>
            <ul>
              {[...shoppingList.entries()].map(([itemID, item]) => (
                item.addToShoppingList === true ?
                  <li key={itemID}>
                    <div className="flex flex-row">
                      <div onClick={() => {
                        saveShoppingList(itemID, { ...item, addToShoppingList: false })
                      }}>
                        <i className="fa-regular fa-square-minus text-red-500"></i>
                      </div>
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className={`${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''} w-max-3/4`}
                        defaultValue={item.itemName}
                        disabled
                      />
                    </div>
                  </li> : null
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-end w-1/2">
            <h2>Completed</h2>
            <ul>
              {[...shoppingList.entries()].map(([itemID, item]) => (
                item.addToShoppingList === false ?
                  <li key={itemID}>
                    <div className="flex flex-row justify-end">
                      <input
                        className={`${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''} w-max-3/4 text-right`}
                        defaultValue={item.itemName}
                        disabled
                      />
                      &nbsp;&nbsp;&nbsp;
                      <div 
                        onClick={() => {
                          saveShoppingList(itemID, { ...item, addToShoppingList: true })
                        }}>
                        <i className="fa-regular fa-square-plus text-green-500"></i>
                      </div>
                    </div>
                  </li> : null
              ))}
            </ul>
          </div>
        </div>
      }
    </>
  )
}

ShoppingListDisplay.propTypes = {
  setIsShoppingListVisible: PropTypes.func,
  theme: PropTypes.string,
  shoppingList: PropTypes.object,
  saveShoppingList: PropTypes.func,
}

export default ShoppingListDisplay