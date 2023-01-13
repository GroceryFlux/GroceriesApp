import React from 'react';
import PropTypes from 'prop-types';

function ExistingLists({ setIsModalVisible, existingLists, setSelectedID }) {
  return (
    <>
      <div className="flex w-full justify-end pt-5 pr-5">
        <button
          className="text-5xl"
          onClick={() => {
            setIsModalVisible(true)
            setSelectedID(undefined)
          }}
        >
          +
        </button>
      </div>
      <div className="flex flex-col pl-5">
        <h1>Saved lists</h1>
        <ul>
          {existingLists.lists.map((list, index) => (
            <li key={`key${index}`}>
              <button onClick={() => {setIsModalVisible(true); setSelectedID(list.id)}}>{list.title}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

ExistingLists.propTypes = {
  setIsModalVisible: PropTypes.func,
  existingLists: PropTypes.object,
  setSelectedIndex: PropTypes.func,
  setSelectedID: PropTypes.func,
};

export default ExistingLists;
