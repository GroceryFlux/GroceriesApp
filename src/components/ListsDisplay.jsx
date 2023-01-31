import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteList, filterList } from './UsuableFunctions';

function ListsDisplay({ setIsModalVisible, setSelectedID, existingLists, setExistingLists }) {

  const [filteredList, setFilteredList] = useState('')

  const handleChange = (e) => {
    setFilteredList(e)
  }

  return (
    <>
      <div className="flex w-full justify-end pt-5 pr-5">
        <button
          className="text-5xl"
          onClick={() => {
            setIsModalVisible(true)
            const listID = crypto.randomUUID()
            setExistingLists(existingLists.set(listID, { title: '', index: null, itemsList: new Map() }));
            setSelectedID(listID);
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
            onChange={(event) => handleChange(event.target.value)}
          ></input>
        </div>
        <ul>
          {[...filterList(filteredList, existingLists).entries()].map(([id, list]) => (
            <li key={`key${id}`}>
              <button onClick={() => {setIsModalVisible(true); setSelectedID(id)}}>{list.title}</button>
              <button onClick={() => deleteList(id, setExistingLists, existingLists)}>&nbsp;-</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

ListsDisplay.propTypes = {
  setIsModalVisible: PropTypes.func,
  existingLists: PropTypes.object,
  setSelectedID: PropTypes.func,
  selectedID: PropTypes.string,
  setExistingLists: PropTypes.func,
};

export default ListsDisplay