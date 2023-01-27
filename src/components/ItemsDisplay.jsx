import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ItemsDisplay({ setExistingLists, existingLists, setIsModalVisible, selectedID }) {
  
  const [listDetails, setListDetails] = useState(existingLists.get(selectedID).itemsList);

  const updateMap = (key, value) => {
    setListDetails(new Map(listDetails.set(key, value)));
  };

  const deleteItem = (key) => {
    const newList = listDetails
    newList.delete(key)
    setListDetails(new Map(newList));
  }


  return (

    <>
      <form
        id='1'
        onSubmit={(event) => {
          event.preventDefault();

          const updatedList = {
            title: event.target[2].value, 
            itemsList: listDetails
          }
            
          setExistingLists(existingLists.set(selectedID, updatedList))


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
            defaultValue={existingLists.get(selectedID).title}
            className="border text-center"
          ></input>
        </div>          
      </form>
      <form 
        onSubmit={(event) => {
          event.preventDefault();
          updateMap(crypto.randomUUID(), { itemName: event.target[0].value });
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
          />
          <button type="submit">&nbsp;add</button>
        </div>
        <div>
          <ul>
            {[...listDetails.entries()].map(([key, value]) => (
              <li key={key}>
                <div className="flex">
                  <div>O&nbsp;</div>
                  <input 
                    
                    onBlur={(event) => updateMap(key, { itemName: event.target.value })} 
                    form='1' 
                    defaultValue={value.itemName} />
                  <div onClick={() => deleteItem(key)}>&nbsp;-</div>
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