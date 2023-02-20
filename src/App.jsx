import React, { useState } from 'react';
import './index.css';
import ListsDisplay from './components/ListsDisplay';
import ItemsDisplay from './components/ItemsDisplay';
import { setLocalStorage, getLocalState } from './utils/localStorage.utils';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [existingLists, setExistingLists] = useState(getLocalState);
  const [theme, setTheme] = useState('Light')

  const saveList = (listID, list) => {
    const newList = new Map(existingLists.set(listID, list));
    setExistingLists(newList);
    setLocalStorage(newList);
  };

  const deleteList = (listID) => {
    existingLists.delete(listID);
    setExistingLists(new Map(existingLists));
    setLocalStorage(existingLists);
  };

  return (
    <>
      <div className={`min-h-screen ${theme === 'Light' ? 'bg-slate-700 text-slate-200' : ''}`}>
        {isModalVisible ? (
          <ItemsDisplay
            setIsModalVisible={setIsModalVisible}
            saveList={saveList}
            selectedList={selectedList}
            theme={theme}
          />
        ) : (
          <ListsDisplay
            setIsModalVisible={setIsModalVisible}
            existingLists={existingLists}
            setSelectedList={setSelectedList}
            saveList={saveList}
            deleteList={deleteList}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </div>
    </>
  );
}

export default App;
