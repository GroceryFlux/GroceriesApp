import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { useThemeStore } from '../../store/theme/theme';

function NewItemForm() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);
  const theme = useThemeStore((state) => state.theme)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        list.itemsList.set(crypto.randomUUID(), {
          itemName: event.target[0].value,
          isOnShoppingList: false,
          isBought: false,
          listID: listID,
        });
        list.timeStamp = Date.now();
        saveExistingLists(listID, list);
        event.target[0].value = '';
      }}
    >
      <div className="flex flex-row justify-center text-center my-4">
        <input
          className={`text-center border-solid border-y-2 rounded-l-lg border-l-2 border-blue-400 p-1 ${
            theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''
          }`}
          placeholder="Bananas"
          defaultValue=""
        />
        <button
          type="submit"
          className="border-solid border-y-2 border-r-2 rounded-r-lg border-blue-400 text-blue-400 p-1"
        >
          &nbsp;<i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </form>
  );
}

export default NewItemForm;
