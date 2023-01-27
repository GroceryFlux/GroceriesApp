import React, { useState } from 'react';
import './input.css';
import ListsDisplay from './components/ListsDisplay';
import ItemsDisplay from './components/ItemsDisplay';

function App() {

  const stateCreator = () => {
    const localState = new Map()
    const getLocalStorage = JSON.parse(localStorage.getItem('existingLists'));
    if(localStorage.getItem('existingLists')) {
      for(let i = 0; i < getLocalStorage.length; i++){
        const itemsList = new Map()
        for(let j = 0; j < getLocalStorage[i][1].itemsList.length; j++){
          localState.set(getLocalStorage[i][0], { title: getLocalStorage[i][1].title, itemsList: itemsList.set(getLocalStorage[i][1].itemsList[j][0] , { itemName: getLocalStorage[i][1].itemsList[j][1].itemName  }) })
        }
      }
    }
    return localState 
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(undefined);
  const [existingLists, setExistingLists] = useState(stateCreator());


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
