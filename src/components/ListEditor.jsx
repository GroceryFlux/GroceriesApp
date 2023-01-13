import React, { useState } from 'react';
import PropTypes from 'prop-types';

function addNewItem(productName, index) {
  return (
    {
      productName: productName,
      quantity: {
        amout: 0,
        unit: '',
      },
      category: [],
      index: index,
      id: crypto.randomUUID()
    }
  )
}

function createNewList(existingLists, target) {
  const newItemArray = {
    title: target[2].value,
    index: 0,
    items: [],
    id: crypto.randomUUID()
  };
  for(let i = 3; i < target.length ; i++){
    newItemArray.items.push(addNewItem(target[i].value, i - 3))
  }
  const newListArray = existingLists
  newListArray.push(newItemArray)
  return newListArray
}

function updateList(existingLists, selectedIndex, target) {
  let updatedItemList = {
    title: target[2].value,
    index: existingLists[selectedIndex].index,
    items: [],
    id: existingLists[selectedIndex].id,
  }
  for(let i = 3; i < target.length ; i++){
    updatedItemList.items.push(addNewItem(target[i].value, i - 3))
  }
  let updatedListArray = existingLists
  updatedListArray.splice(selectedIndex, 1, updatedItemList)
  return updatedListArray
}

function ListEditor({ setExistingLists, existingLists, setIsModalVisible, selectedID }) {

  const defaultState = selectedID ? existingLists.lists[existingLists.lists.findIndex(x => x.id === selectedID)] : {
    title: '',
    items: [addNewItem('')],
    index: 0,
    id: undefined
  }

  const [list, setList] = useState(defaultState);

  function saveList(existingLists, selectedID, target) {
    selectedID === undefined ? 
      setExistingLists({ lists: createNewList(existingLists, target) }) : existingLists.findIndex(x => x.id === selectedID) > -1 ? 
        setExistingLists({ lists: updateList(existingLists, existingLists.findIndex(x => x.id === selectedID), target) }) : setExistingLists({ lists: createNewList(existingLists, target) })
  }
  
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveList(existingLists.lists, selectedID, event.target)
        }}
      >
        <div className="flex justify-between pt-5 pl-5 pr-5">
          <button
            onClick={() => setIsModalVisible(false)}
            className="text-5xl"
            type="button"
          >
            &lt;-
          </button>
          <button type="submit">Save</button>
        </div>
        <div className="flex justify-center">
          <input
            placeholder="Title"
            defaultValue={list.title}
            className="border text-center"
          ></input>
        </div>
        <div className="flex flex-col justify-center border text-center">
          <h1>List</h1>
          <div>
            {list.items.map((item, index) => {
              if (index === list.items.length - 1) {
                return (
                  <div
                    key={index}
                    onFocus={() =>
                      setList({
                        items: [
                          ...list.items,
                          addNewItem(),
                        ],
                      })
                    }
                    className="text-gray-300"
                  >
                    o <input placeholder="click to add" />
                  </div>
                );
              }

              return (
                <div key={index} 
                  className="flex justify-center"
                >
                  o &nbsp;
                  <input
                    placeholder="Bananas"
                    defaultValue={item.productName}
                  ></input>
                  <div>&nbsp;--</div>
                </div>
              );
            })}
          </div>
        </div>
      </form>

      {/*<form>
        <div className="flex justify-center mt-5">
          <input
            placeholder="Title"
            defaultValue={list.title}
            className="border text-center"
          >
          </input>
        </div>       
        <div className="flex flex-col justify-center border text-center">
          <h1>LIST</h1>
          <div className="flex justify-center space-x-3">
            <input
              placeholder="Banana"
              className="border text-center"
            >    
            </input>
            <button
              className="ml-5"
            >
              +
            </button>
          </div>
        </div>
      </form>*/}
    </>
  );
}

ListEditor.propTypes = {
  setExistingLists: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  existingLists: PropTypes.object,
  selectedList: PropTypes.object,
  selectedID: PropTypes.string,
};

export default ListEditor;
