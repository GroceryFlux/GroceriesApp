import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { filterItems } from '../utils/filterValue.utils';

function ItemsDisplay({ setIsModalVisible, selectedList, saveList }) {
  const itemName = useRef(null);
  const [listID, list] = selectedList;
  const [filterValue, setFilterValue] = useState('');

  return (
    <>
      <div className="flex justify-between pt-5 pl-5 pr-5">
        <button
          onClick={() => setIsModalVisible(false)}
          className="text-5xl"
          type="button"
        >
          &lt;-
        </button>
      </div>
      <div className="flex justify-center">
        <input
          placeholder="Title"
          defaultValue={list.title}
          className="border text-center"
          onBlur={(event) => {
            list.title = event.target.value;
            saveList(listID, list);
          }}
        ></input>
      </div>
      <div className="flex justify-center">
        <input
          placeholder="Filter"
          className="border text-center"
          onChange={(event) => setFilterValue(event.target.value)}
        ></input>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.target[0].value = '';
          list.itemsList.set(crypto.randomUUID(), { itemName: itemName.current.value });
          saveList(listID, list);
        }}
      >
        <div className="flex flex-col justify-center border text-center">
          <h1>List</h1>
        </div>
        <div className="flex flex-row justify-center border text-center">
          <div>
            <input
              className="border text-center"
              placeholder="Bananas"
              defaultValue=""
              ref={itemName}
            />
          </div>
          <div>
            <button type="submit">&nbsp;add</button>
          </div>
        </div>
      </form>
      <div>
        <ul>
          {filterItems(filterValue, list.itemsList).map(([itemID, item]) => (
            <li key={itemID}>
              <div className="flex">
                <div>O&nbsp;</div>
                <input
                  onBlur={(event) => {
                    item.itemName = event.target.value;
                    saveList(listID, list);
                  }}
                  defaultValue={item.itemName}
                />
                <div
                  onClick={() => {
                    list.itemsList.delete(itemID);
                    saveList(listID, list);
                  }}
                >
                  &nbsp;-
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

ItemsDisplay.propTypes = {
  setExistingLists: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  existingLists: PropTypes.object,
  selectedList: PropTypes.object,
  selectedID: PropTypes.string,
  saveList: PropTypes.func,
};

export default ItemsDisplay;
