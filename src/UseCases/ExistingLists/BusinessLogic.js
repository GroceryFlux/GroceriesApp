import {
  deleteItemFromExistingList,
  deleteListFromExistingLists,
  getItemFromExistingList,
  getList,
  saveItemInExistingList,
  saveList,
} from './Repository';
import { useSelectedListStore } from '../SelectedList/Store';
import {
  addItemToShoppingList,
  removeItemFromShoppingList,
  updateItemInShoppingList,
} from '../ShoppingList/BusinessLogic';
import { extractItemDetails } from '../../utils/quantitiesAndUnits';

export function createList() {
  const listID = crypto.randomUUID();
  const list = { title: '', timeStamp: undefined, itemsList: new Map() };

  saveList({ listID, list });
  useSelectedListStore.getState().setSelectedListID(listID);
}

export function createItem({ listID, input }) {
  const itemID = crypto.randomUUID();
  const extractedItemDetails = extractItemDetails(input);
  const list = getList(listID);
  list.itemsList.set(itemID, {
    itemName: extractedItemDetails.itemName,
    quantity: extractedItemDetails.quantity,
    unit: extractedItemDetails.unit,
    associatedIDs: [{ itemID: itemID, listID: listID }],
    isOnShoppingList: false,
    isBought: false,
  });

  saveList({ listID, list });
}

export function saveItemFromInputInExistingList({ input, itemID, listID }) {
  const oldItem = getItemFromExistingList({ itemID, listID });
  const extractedItemDetails = extractItemDetails(input);

  const newItem = {
    listID,
    itemID,
    item: {
      ...oldItem,
      itemName: extractedItemDetails.itemName,
      quantity: extractedItemDetails.quantity,
      unit: extractedItemDetails.unit,
    },
  };

  saveItemInExistingList(newItem);

  if (!oldItem.isOnShoppingList) {
    return;
  }

  updateItemInShoppingList({ oldItem, newItem: newItem.item });
}

export function deleteList(listID) {
  const list = getList(listID);

  list.itemsList.forEach((item) => {
    if (!item.isOnShoppingList) {
      return;
    }

    removeItemFromShoppingList(item);
  });

  deleteListFromExistingLists(listID);
}

export function deleteItemFromList({ listID, itemID }) {
  const item = getItemFromExistingList({ listID, itemID });

  if (item.isOnShoppingList) {
    removeItemFromShoppingList(item);
  }

  deleteItemFromExistingList({ listID, itemID });
}

export function toggleItemOnShoppingList(item) {
  if (item.isOnShoppingList) {
    removeItemFromShoppingList(item);
    return;
  }

  addItemToShoppingList(item);
}
