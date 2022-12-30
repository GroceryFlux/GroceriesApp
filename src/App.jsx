import React, { useState } from 'react';
import './input.css';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [items, setItems] = useState(['']);
  const [shoppingList, saveList] = useState([]);

  console.log('asba')

  return (
    <>
      {isModalVisible ? (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const newArray = [];
              for (let i = 2; i < event.target.length - 1; i++) {
                newArray.push(event.target[i].value);
                saveList(newArray);
              }
            }}
          >
            <div className="flex justify-between pt-5 pl-5 pr-5">
              <button
                onClick={() => setIsModalVisible(false)}
                className="text-5xl"
              >
                &lt;-
              </button>
              <button type="submit">Save</button>
            </div>
            <div className="flex justify-center">
              <input
                placeholder="Title"
                value={shoppingList[0]}
                className="border text-center"
              ></input>
            </div>
            <div className="flex flex-col justify-center border text-center">
              <h1>List</h1>
              <div>
                {items.map((item, index) => {
                  if (index === items.length - 1) {
                    return (
                      <div
                        key={item}
                        onFocus={() => setItems([...items, 'new item'])}
                        className="text-gray-300"
                      >
                        o <input placeholder="click to add" />
                      </div>
                    );
                  }

                  return (
                    <div key={item}>
                      o &nbsp;
                      <input
                        placeholder="Bananas"
                        value={shoppingList[index + 1]}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex w-full justify-end pt-5 pr-5">
            <button
              className="text-5xl"
              onClick={() => setIsModalVisible(true)}
            >
              +
            </button>
          </div>
          <div className="flex flex-col pl-5">
            <h1>Existing lists</h1>- {shoppingList[0]}
          </div>
        </>
      )}
    </>
  );
}

export default App;
