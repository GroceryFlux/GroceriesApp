import React, { useState } from 'react';
import ListEditor from './components/ListEditor';
import ExistingLists from './components/ExistingLists';
import './input.css';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState()

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
          selectedList={selectedIndex !== undefined ? existingLists.lists[selectedIndex] : undefined}
        />
      ) : (
        <ExistingLists
          setIsModalVisible={setIsModalVisible}
          existingLists={existingLists}
          setSelectedIndex={setSelectedIndex}

        />
      )}
    </>
  );
}

export default App;
