import React, { useState } from 'react';
import { useListsStore } from '../../store/lists/lists';
import { PlusSolidIcon } from '../Icons';

function NewItemForm() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);

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
      <div
        className={`flex grow shrink justify-between text-center text-xl border border-accent rounded-2xl bg-neutral ${
          hasItemName === false ? 'border-red-400' : null
        }`}
      >
        <input
          className={`bg-neutral grow shrink outline-none ml-3
          ${hasItemName === false ? 'border-red-400' : null}
          `}
          placeholder="Add an item"
          defaultValue=""
          onChange={(event) => (event.target.value != '' ? setHasItemName(true) : null)}
        />
        <button
          type="submit"
          className={`
          ${hasItemName === false ? 'border-red-400 text-red-400' : null}
          `}
        >
          <PlusSolidIcon />
        </button>
      </div>
    </form>
  );
}

export default NewItemForm;
