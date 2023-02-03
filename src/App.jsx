import React, { useState } from 'react';
import './index.css';
import ListsDisplay from './components/ListsDisplay';
import ItemsDisplay from './components/ItemsDisplay';
import { setLocalStorage, getLocalState } from './utils/localStorage.utils';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [existingLists, setExistingLists] = useState(getLocalState);

  const saveList = (listID, list) => {
    const newList = new Map(existingLists.set(listID, list));
    setExistingLists(newList);
    setLocalStorage(newList);
  };

  const deleteList = (listID) => {
    existingLists.delete(listID);
    setExistingLists(existingLists);
    setLocalStorage(existingLists);
  };

  return (
    <>
      {isModalVisible ? (
        <ItemsDisplay
          setIsModalVisible={setIsModalVisible}
          saveList={saveList}
          selectedList={selectedList}
        />
      ) : (
        <ListsDisplay
          setIsModalVisible={setIsModalVisible}
          existingLists={existingLists}
          setSelectedList={setSelectedList}
          saveList={saveList}
          deleteList={deleteList}
        />
      )}
    </>
  );
}

export default App;
