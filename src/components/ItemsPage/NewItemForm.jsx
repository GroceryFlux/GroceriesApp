import React, { useState } from 'react';
import { useListsStore } from '../../store/lists/lists';
import { useThemeStore } from '../../store/theme/theme';

function NewItemForm() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);
  const theme = useThemeStore((state) => state.theme);

  const [hasItemName, setHasItemName] = useState(null);

  function checkSubmit(event) {
    if (!event.target[0].value) {
      setHasItemName(false);
      return;
    }

    setHasItemName(true);
    
    list.itemsList.set(crypto.randomUUID(), {
      itemName: event.target[0].value,
      isOnShoppingList: false,
      isBought: false,
      listID: listID,
    });
    
    list.timeStamp = Date.now();
    saveExistingLists(listID, list);

    event.target[0].value = '';
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        checkSubmit(event);
      }}
    >
      <div className="flex flex-row justify-center text-center my-4">
        <input
          className={`text-center border-solid border-y-2 rounded-l-lg border-l-2 outline-none placeholder:italic p-1 
          ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}
          ${hasItemName === false ? 'border-red-400' : null}
          `}
          placeholder="Add an item"
          defaultValue=""
          onChange={(event) => (event.target.value != '' ? setHasItemName(true) : null)}
        />
        <button
          type="submit"
          className={`border-solid border-y-2 border-r-2 rounded-r-lg  p-1
          ${hasItemName === false ? 'border-red-400 text-red-400' : null}
          `}
        >
          &nbsp;<i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </form>
  );
}

export default NewItemForm;
