import React, { useState } from 'react';
import ListEditor from './components/ListEditor';
import ExistingLists from './components/ExistingLists';
import './input.css';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedID, setSelectedID] = useState(undefined);

  const [existingLists, setExistingLists] = useState({
    /*sortBy: '',*/
    lists: [],
  });

  return (
    <>
      {isModalVisible ? (
        <ListEditor
          setExistingLists={setExistingLists}
          setIsModalVisible={setIsModalVisible}
          existingLists={existingLists}
          selectedID={selectedID}
          setSelectedID={setSelectedID}
        />
      ) : (
        <ExistingLists
          setIsModalVisible={setIsModalVisible}
          existingLists={existingLists}
          setSelectedID={setSelectedID}
        />
      )}
    </>
  );
}

export default App;
