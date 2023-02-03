import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { filterLists } from '../utils/filterValue.utils';

function ListsDisplay({ setIsModalVisible, setSelectedList, existingLists, saveList, deleteList }) {
  const [filterValue, setFilterValue] = useState('');

  return (
    <>
      <div className="flex w-full justify-end pt-5 pr-5">
        <button
          className="text-5xl"
          onClick={() => {
            setIsModalVisible(true);
            const listID = crypto.randomUUID();
            const list = { title: '', itemsList: new Map() };
            saveList(listID, list);
            setSelectedList([listID, list]);
          }}
        >
          +
        </button>
      </div>
      <div className="flex flex-col pl-5">
        <h1>Saved lists</h1>
        <div>
          <input
            placeholder="Filter"
            className="border text-center"
            onChange={(event) => setFilterValue(event.target.value)}
          ></input>
        </div>
        <ul>
          {filterLists(filterValue, existingLists).map(([listID, list]) => (
            <li key={listID}>
              <button
                onClick={() => {
                  setIsModalVisible(true);
                  setSelectedList([listID, list]);
                }}
              >
                {list.title}
              </button>
              <button onClick={() => deleteList(listID)}>&nbsp;-</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

ListsDisplay.propTypes = {
  setIsModalVisible: PropTypes.func,
  existingLists: PropTypes.object,
  setSelectedList: PropTypes.func,
  saveList: PropTypes.func,
  deleteList: PropTypes.func,
};

export default ListsDisplay;
