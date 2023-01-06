import React from 'react';
import PropTypes from 'prop-types';

function ExistingLists({ setIsModalVisible, existingLists, setSelectedIndex }) {
  return (
    <>
      <div className="flex w-full justify-end pt-5 pr-5">
        <button
          className="text-5xl"
          onClick={() => {
            setIsModalVisible(true)
            setSelectedIndex(undefined)
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
              <button onClick={() => {setIsModalVisible(true); setSelectedIndex(index)}}>{list.title}</button>
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
  setSelectedIndex: PropTypes.func
};

export default ExistingLists;
