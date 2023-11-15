import React, { useState } from 'react';
import { useListsStore } from '../../store/lists/lists';
import { PlusIcon } from '../Icons';
import SearchItemButton from './SearchItemButton.jsx';
import { findItemDuplicateId } from '../../utils/duplicates';
import { addItems, areItemsCompatible, extractItemDetails } from '../../utils/quantitiesAndUnits';

let warningBorderTimeout;
export const newItemFormId = 'newItemInput';

function NewItemForm() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveNewItem = useListsStore((state) => state.saveNewItem);
  const saveItem = useListsStore((state) => state.saveItem);

  const [hasError, setHasError] = useState(false);

  function onSubmit(event) {
    event.preventDefault();

    const inputValue = event.target[0].value;

    if (!inputValue) {
      setHasError(true);
      clearTimeout(warningBorderTimeout);
      warningBorderTimeout = setTimeout(() => setHasError(false), 1500);
      return;
    }

    const extractedItemDetails = extractItemDetails(inputValue);
    const originalItemId = findItemDuplicateId(list.itemsList, extractedItemDetails.itemName);

    if (!originalItemId) {
      saveNewItem(extractedItemDetails, list, listID);
      event.target[0].value = '';
      return;
    }

    const existingQuantity = list.itemsList.get(originalItemId).quantity;
    const existingUnit = list.itemsList.get(originalItemId).unit;
    const duplicateQuantity = extractedItemDetails.quantity;
    const duplicateUnit = extractedItemDetails.unit;

    const itemsAreCompatible = areItemsCompatible(existingQuantity, existingUnit, duplicateQuantity, duplicateUnit);

    if (!itemsAreCompatible) {
      saveNewItem(extractedItemDetails, list, listID);
      event.target[0].value = '';
      return;
    }

    const sumItem = addItems(existingQuantity, existingUnit, duplicateQuantity, duplicateUnit);

    const updatedItemDetails = {
      itemName: list.itemsList.get(originalItemId).itemName,
      quantity: sumItem.quantity,
      unit: sumItem.unit,
    };

    saveItem(updatedItemDetails, originalItemId, listID);
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
