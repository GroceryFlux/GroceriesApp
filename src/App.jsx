import React, { useState } from 'react';
import './index.css';
import ListsDisplay from './components/ListsDisplay';
import ItemsDisplay from './components/ItemsDisplay';
import { setLocalExistingLists, getLocalExistingLists, getLocalShoppingList, setLocalShoppingList } from './utils/localStorage.utils';
import ShoppingListDisplay from './components/ShoppingListDisplay';

function App() {
  const [isItemsDisplayVisible, setIsItemsDisplayVisible] = useState(false);
  const [isShoppingListVisible, setIsShoppingListVisible] = useState(false)
  const [selectedList, setSelectedList] = useState(null);
  const [existingLists, setExistingLists] = useState(getLocalExistingLists);
  const [shoppingList, setShoppingList]= useState(getLocalShoppingList);
  const [theme, setTheme] = useState('Light');

  const saveList = (listID, list) => {
    const newList = new Map(existingLists.set(listID, list));
    setExistingLists(newList);
    setLocalExistingLists(newList);
  };

  const saveShoppingList = (itemID, item) => {
    const newShoppingList = new Map(shoppingList.set(itemID, item))
    setShoppingList(newShoppingList)
    setLocalShoppingList(shoppingList)
  }

  const deleteList = (listID) => {
    existingLists.delete(listID);
    setExistingLists(new Map(existingLists));
    setLocalExistingLists(existingLists);
  };

  return (
    <>
      <div className={`flex flex-col min-w-[280px] items-center w-screen h-screen ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}>
        {isItemsDisplayVisible ? (
          <ItemsDisplay
            setIsItemsDisplayVisible={setIsItemsDisplayVisible}
            saveList={saveList}
            selectedList={selectedList}
            theme={theme}
            shoppingList={shoppingList}
            existingLists={existingLists}
          />
        ) : (
          isShoppingListVisible ? (
            <ShoppingListDisplay
              setIsShoppingListVisible={setIsShoppingListVisible}
              existingLists={existingLists}
              saveList={saveList}
              theme={theme}
              shoppingList={shoppingList}
              setShoppingList={setShoppingList}
              saveShoppingList={saveShoppingList}
            />
          ) : (
            <ListsDisplay
              setIsItemsDisplayVisible={setIsItemsDisplayVisible}
              setIsShoppingListVisible={setIsShoppingListVisible}
              existingLists={existingLists}
              setSelectedList={setSelectedList}
              saveList={saveList}
              deleteList={deleteList}
              theme={theme}
              setTheme={setTheme}
            />
          ))}
      </div>
    </>
  );
}

export default App;
