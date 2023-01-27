import React, { useState } from 'react';
import './input.css';
import ListsDisplay from './components/ListsDisplay';
import ItemsDisplay from './components/ItemsDisplay';

function App() {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(undefined);
  const [existingLists, setExistingLists] = useState(new Map());

  return (
    <>
      {isModalVisible ? (
        <ItemsDisplay
          setExistingLists={setExistingLists}
          setIsModalVisible={setIsModalVisible}
          existingLists={existingLists}
          selectedID={selectedID}
          setSelectedID={setSelectedID}
        />
      ) : (
        <ListsDisplay
          setIsModalVisible={setIsModalVisible}
          setExistingLists={setExistingLists}
          existingLists={existingLists}
          setSelectedID={setSelectedID}
        />
      )}
    </>
  );
}

export default App;
