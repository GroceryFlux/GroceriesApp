import React, { useState } from 'react';
import PropTypes from 'prop-types';

function getNewItem() {
  return (
    {
      productName: '',
      quantity: {
        amout: 0,
        unit: '',
      },
      category: [],
      index: 0,
    }
  )
}

function ListEditor({ setExistingLists, existingLists, setIsModalVisible, selectedList, selectedIndex, setSelectedIndex }) {
  
  const defaultState = selectedList ? selectedList : {
    title: '',
    items: [getNewItem()],
    index: 0,
  }

  const [list, setList] = useState(defaultState);

  function indexFinder(value, arr){
    const isValueEqual = (element) => value === element.index
    return arr.findIndex(isValueEqual)
  }

  function saveList(savedLists, target) {
    const newArray = savedLists
    if(indexFinder(selectedIndex, savedLists) > -1){
      let updatedList = {
        title: target[2].value,
        index: savedLists[selectedIndex].index,
        items: []
      }
      for(let i = 3; i < target.length ; i++){
        updatedList.items.push({ productName: target[i].value })
      }
      newArray.splice(selectedIndex, 1, updatedList)
    }
    else if(indexFinder(selectedIndex, savedLists) === -1){
      let newList = {
        title: target[2].value,
        index: selectedIndex === undefined ? savedLists.length : selectedIndex,
        items: [],
      }
      for(let i = 3; i < target.length ; i++){
        newList.items.push({ productName: target[i].value })
      }
      setSelectedIndex(selectedIndex === undefined ? savedLists.length : selectedIndex)
      newArray.push(newList);
    }
    setExistingLists({ lists: newArray })
  }

  
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveList(existingLists.lists, event.target)
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
                          getNewItem(),
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
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func,
};

export default ListEditor;
