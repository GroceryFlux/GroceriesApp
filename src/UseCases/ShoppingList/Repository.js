import { useExistingShoppingListStore } from "./Store";

export function saveShoppingList(shoppingList) {
  const newShoppingList = new Map(shoppingList)

  useExistingShoppingListStore.getState().saveShoppingListInStore(newShoppingList)
}

export function saveItemInShoppingList({ shoppingListID, item }) {
  const shoppingList = getShoppingList()
  shoppingList.set(shoppingListID, item)

  saveShoppingList(shoppingList)
}


export function getShoppingList() {
  return useExistingShoppingListStore.getState().shoppingList;
}


export function getItemFromShoppingList(itemID) {
  return getShoppingList().get(itemID);
}


export function deleteItemFromShoppingList(item) {
  const newShoppingList = getShoppingList()
  const shoppingListID = item.associatedIDs[0].shoppingListID;

  newShoppingList.delete(shoppingListID)

  useExistingShoppingListStore.getState().startCartAnimation()

  return saveShoppingList(newShoppingList)
}

