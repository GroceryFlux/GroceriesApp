import React from 'react';
import ItemTitleInput from './ItemTitleInput';
import { useListsStore } from '../../store/lists/lists';
import AddItemButton from './AddItemButton';

function NewItemForm() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        list.itemsList.set(crypto.randomUUID(), {
          itemName: event.target[0].value,
          addToShoppingList: false,
          isBought: false,
        });
        list.timeStamp = Date.now();
        saveExistingLists(listID, list);
        event.target[0].value = '';
      }}
    >
      <div className="flex flex-row justify-center text-center my-4">
        <div>
          <ItemTitleInput />
        </div>
        <div>
          <AddItemButton />
        </div>
      </div>
    </form>
  );
}

export default NewItemForm;
