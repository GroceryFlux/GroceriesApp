import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { saveListTitle, updateList, deleteItem } from './UsuableFunctions';

function ItemsDisplay({ setExistingLists, existingLists, setIsModalVisible, selectedID }) {

  const inputValue = useRef(null)

  return (

    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
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
        </div>
        <div className="flex justify-center">
          <input
            placeholder="Title"
            defaultValue={existingLists.get(selectedID).title}
            className="border text-center"
            onBlur={(event) => saveListTitle(selectedID, event.target.value, setExistingLists, existingLists)}
          ></input>
        </div>          
      </form>
      <form 
        onSubmit={(event) => {
          event.preventDefault();
          event.target[0].value = '';
        }}>
        <div className="flex flex-col justify-center border text-center">
          <h1>List</h1>
        </div>
        <div className="flex justify-center">
          <input 
            className="border text-center"
            placeholder='Bananas'
            defaultValue=''
            ref={inputValue}
          />
          <button 
            onClick={() => updateList(selectedID, crypto.randomUUID(), { itemName: inputValue.current.value }, setExistingLists, existingLists)}
          >&nbsp;add</button>
        </div>
        <div>
          <ul>
            {[...existingLists.get(selectedID).itemsList.entries()].map(([id, value]) => (
              <li key={id}>
                <div className="flex">
                  <div>O&nbsp;</div>
                  <input 
                    onBlur={(event) => updateList(selectedID, id, { itemName: event.target.value }, setExistingLists, existingLists)} 
                    defaultValue={value.itemName} />
                  <div onClick={() => deleteItem(selectedID, id, setExistingLists, existingLists)}>&nbsp;-</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </>
  )
}

ItemsDisplay.propTypes = {
  setExistingLists: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  existingLists: PropTypes.object,
  selectedList: PropTypes.object,
  selectedID: PropTypes.string,
};

export default ItemsDisplay;