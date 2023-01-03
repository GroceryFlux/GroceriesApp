import React, { useState } from 'react';
import PropTypes from 'prop-types';


function ListEditor({ setOverview, listOverview, setIsModalVisible, selectedList }) {
  
  const defaultState = selectedList ? selectedList : {
    title: '',
    items: [
      {
        productName: '',
        quantity: {
          amout: 0,
          unit: '',
        },
        category: [],
      },
    ],
    /*index: 0,
    sortBy: '',*/
  }

  console.log(selectedList)

  const [list, setList] = useState(defaultState);
  
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const newList = {
            title: event.target[2].value,
            items: [],
          };

          for (let i = 3; i < event.target.length; i++) {
            newList.items.push({ productName: event.target[i].value });
          }

          const newArray = listOverview.lists;
          newArray.push(newList);
          setOverview({ lists: newArray });
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
                          {
                            productName: '',
                            quantity: {
                              amout: 0,
                              unit: '',
                            },
                            category: [],
                            index: 0,
                          },
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
