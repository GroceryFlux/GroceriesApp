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

function ListEditor({ setOverview, listOverview, setIsModalVisible, selectedList }) {
  
  const defaultState = selectedList ? selectedList : {
    title: '',
    items: [getNewItem()]
  }

  const [list, setList] = useState(defaultState);

  function indexFinderTitle(value, arr){
    const isValueEqual = (element) => value === element.title
    return arr.findIndex(isValueEqual)
  }

  function saveList(lists, target) {
    const newList = {
      title: target[2].value,
      items: [],
    }
    for(let i = 3; i < target.length; i++){
      newList.items.push({ productName: target[i].value })
    }
    const newArray = listOverview.lists
    if(indexFinderTitle(target[2].value, lists) === -1){
      newArray.push(newList);
    }
    else if(indexFinderTitle(target[2].value, lists) > -1){
      newArray.splice(indexFinderTitle(target[2].value, lists), 1, newList)
    }
    setOverview({ lists: newArray })
  }

  
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          saveList(listOverview.lists, event.target)
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
                <div key={index}>
                  o &nbsp;
                  <input
                    placeholder="Bananas"
                    defaultValue={item.productName}
                  ></input>
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
  setOverview: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  listOverview: PropTypes.object,
  selectedList: PropTypes.object
};

export default ListEditor;
