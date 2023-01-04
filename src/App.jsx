import React, { useState } from 'react';
import ListEditor from './components/ListEditor';
import ListOverview from './components/ListOverview';
import './input.css';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState()

  const [listOverview, setOverview] = useState({
    /*sortBy: '',*/
    lists: [],
  });

  return (
    <>
      {isModalVisible ? (
        <ListEditor
          setOverview={setOverview}
          setIsModalVisible={setIsModalVisible}
          listOverview={listOverview}
          selectedList={selectedIndex !== undefined ? listOverview.lists[selectedIndex] : undefined}
        />
      ) : (
        <ListOverview
          setIsModalVisible={setIsModalVisible}
          listOverview={listOverview}
          setSelectedIndex={setSelectedIndex}

        />
      )}
    </>
  );
}

export default App;
