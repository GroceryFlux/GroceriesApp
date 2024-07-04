import { useExistingListsStore } from './Store';

export function saveItemInExistingList({ listID, itemID, item }) {
  const list = getList(listID);
  list.itemsList.set(itemID, item);

  saveList({ listID, list });
}

export function getList(listID) {
  return getExisitingLists().get(listID);
}

export function saveList({ listID, list }) {
  const newExistingLists = new Map(getExisitingLists());

  newExistingLists.set(listID, { ...list, timeStamp: Date.now() });

  saveExistingLists(newExistingLists);
}

export function getItemFromExistingList({ itemID, listID }) {
  return getList(listID).itemsList.get(itemID);
}

export function deleteListFromExistingLists(listID) {
  const newExistingLists = new Map(getExisitingLists());

  newExistingLists.delete(listID);

  saveExistingLists(newExistingLists);
}

export function deleteItemFromExistingList({ listID, itemID }) {
  const list = getList(listID);
  list.itemsList.delete(itemID);

  saveList({ listID, list });
}

function getExisitingLists() {
  return useExistingListsStore.getState().existingLists;
}

function saveExistingLists(newExistingLists) {
  useExistingListsStore.getState().saveExistingListsInStore(newExistingLists);
}
