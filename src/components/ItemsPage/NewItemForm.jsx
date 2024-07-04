import React, { useState } from 'react';
import { PlusIcon } from '../Icons';
import SearchItemButton from './SearchItemButton.jsx';
import { findItemDuplicateId } from '../../utils/duplicates';
import { addItems, areItemsCompatible, extractItemDetails } from '../../utils/quantitiesAndUnits';
import { useSelectedListStore } from '../../UseCases/SelectedList/Store.js';
import { getItemFromExistingList, getList, saveItemInExistingList } from '../../UseCases/ExistingLists/Repository.js';
import { createItem } from '../../UseCases/ExistingLists/BusinessLogic.js';
import { updateItemInShoppingList } from '../../UseCases/ShoppingList/BusinessLogic.js';

let warningBorderTimeout;
export const newItemFormId = 'newItemInput';

function NewItemForm() {
  const listID = useSelectedListStore((state) => state.selectedListID);
  const list = getList(listID);

  const [hasError, setHasError] = useState(false);

  function onSubmit(event) {
    event.preventDefault();

    const input = event.target[0].value;

    if (!input) {
      setHasError(true);
      clearTimeout(warningBorderTimeout);
      warningBorderTimeout = setTimeout(() => setHasError(false), 1500);
      return;
    }

    const extractedItemDetails = extractItemDetails(input);
    const originalItemId = findItemDuplicateId(list.itemsList, extractedItemDetails.itemName);

    if (!originalItemId) {
      createItem({ input, listID });
      event.target[0].value = '';
      return;
    }

    const existingItem = getItemFromExistingList({ itemID: originalItemId, listID });

    const itemsAreCompatible = areItemsCompatible(
      existingItem.quantity,
      existingItem.unit,
      extractedItemDetails.quantity,
      extractedItemDetails.unit,
    );

    if (!itemsAreCompatible) {
      createItem({ input, listID });
      event.target[0].value = '';
      return;
    }

    const sumItem = addItems(
      existingItem.quantity,
      existingItem.unit,
      extractedItemDetails.quantity,
      extractedItemDetails.unit,
    );

    const updatedItem = {
      ...existingItem,
      quantity: sumItem.quantity,
      unit: sumItem.unit,
    };

    if (!existingItem.isOnShoppingList) {
      saveItemInExistingList({ item: updatedItem, itemID: originalItemId, listID });
      return;
    }

    updateItemInShoppingList({ oldItem: existingItem, newItem: updatedItem });
    event.target[0].value = '';
  }

  return (
    <form
      onSubmit={onSubmit}
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
