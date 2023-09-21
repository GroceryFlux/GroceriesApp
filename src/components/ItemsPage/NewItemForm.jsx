import React, { useState } from 'react';
import { useListsStore } from '../../store/lists/lists';
import { PlusIcon } from '../Icons';
import SearchItemButton from './SearchItemButton.jsx';

let timeout;
export const newItemFormId = 'newItemInput';

function NewItemForm() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);

  const [hasError, setHasError] = useState(false);

  function checkSubmit(event) {
    if (!event.target[0].value) {
      setHasError(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setHasError(false), 1500);
      return;
    }

    setHasError(false);

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
      className="flex w-full justify-between items-center gap-4"
    >
      <div className="flex w-full gap-4">
        <div className="flex flex-col w-28 grow py-2">
          <input
            className={`
          w-full bg-base-100 text-info py-1 px-2 rounded-md focus:outline focus:outline-blue-500/50 placeholder:info-content placeholder:italic
          ${hasError ? 'outline outline-red-500/50 focus:outline-red-500/50' : ''}
          `}
            placeholder="Strawberries"
            id={newItemFormId}
            onInput={() => setHasError(false)}
          />
          <div className="w-full px-2 -mt-1">
            <div className="border-b-2 border-b-info-content w-full"></div>
          </div>
        </div>

        <button
          type="submit"
          className="text-primary"
        >
          <PlusIcon />
        </button>

        <SearchItemButton />
      </div>
    </form>
  );
}

export default NewItemForm;
