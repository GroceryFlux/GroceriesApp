import { findItemDuplicateId } from "../../utils/duplicates";
import { addItems, areItemsCompatible, substractItems } from "../../utils/quantitiesAndUnits";
import { getItemFromExistingList, saveItemInExistingList } from "../ExistingLists/Repository";
import { deleteItemFromShoppingList, getItemFromShoppingList, getShoppingList, saveItemInShoppingList } from "./Repository";
import { useExistingShoppingListStore } from "./Store";

export function updateItemInShoppingList({ oldItem, newItem }) {
  removeItemFromShoppingList(oldItem);
  addItemToShoppingList(newItem);
}


export function removeItemFromShoppingList(listItem) {
  useExistingShoppingListStore.getState().startCartAnimation()

  const associatedShoppingListID = getShoppingListIDFromItem(listItem)
  
  const shoppingListItem = getItemFromShoppingList(associatedShoppingListID);

  const listID = listItem.associatedIDs[0].listID;
  const itemID = listItem.associatedIDs[0].itemID;

  const newItemDetails = {
    ...listItem,
    associatedIDs: [{ itemID: itemID, listID: listID }],
    isOnShoppingList: false,
    isBought: false,
  };

  saveItemInExistingList({ listID, itemID, item: newItemDetails })

  if(shoppingListItem.associatedIDs.length === 1) {
    deleteItemFromShoppingList(shoppingListItem)
    return
  }

  const newItemInShoppingList = unmergeItems({ shoppingListItem, itemID, item: listItem })

  saveItemInShoppingList({ shoppingListID: associatedShoppingListID, item: newItemInShoppingList })
}


export function addItemToShoppingList(item) {
  useExistingShoppingListStore.getState().startCartAnimation()

  const shoppingList = getShoppingList()
  const duplicateItemID = findItemDuplicateId(shoppingList, item.itemName)
  
  const itemID = item.associatedIDs[0].itemID;
  const listID = item.associatedIDs[0].listID;
  
  if(!duplicateItemID) {
    createItemInShoppingList({ item, listID, itemID })
    return;
  }

  const duplicateItem = getItemFromShoppingList(duplicateItemID)

  const itemsAreCompatible = areItemsCompatible(duplicateItem.quantity, duplicateItem.unit, item.quantity, item.unit)

  const itemsHaveSameIsBought = duplicateItem.isBought === item.isBought

  if(!itemsAreCompatible || !itemsHaveSameIsBought) {
    createItemInShoppingList({ item, listID, itemID })
    return
  }

  const updatedItemOnExistingList = {
    ...item,
    associatedIDs: [{ itemID: itemID, listID: listID, shoppingListID: duplicateItemID }],
    isOnShoppingList: true,
  }

  saveItemInExistingList({ listID, itemID, item: updatedItemOnExistingList })

  const updatedItemOnShoppingList = mergeItems({ updatedItemOnExistingList, duplicateItem, item });

  saveItemInShoppingList({ shoppingListID: duplicateItemID, item: updatedItemOnShoppingList })
}


export function clearItemsFromShoppingList() {
  [...getShoppingList().entries()].forEach(([ ,item]) => {
    
    item.associatedIDs.forEach(({ listID, itemID }) => {
      const itemInExistingList = getItemFromExistingList({ itemID, listID })
      saveItemInExistingList({ 
        listID, 
        itemID, 
        item: {
          ...itemInExistingList,
          associatedIDs: [{ listID, itemID }],
          isOnShoppingList: false,
          isBought: false
        } 
      })
    })

    deleteItemFromShoppingList(item)
  })
}


export function toggleItemIsBought({ shoppingListID, item }) {
  saveItemInShoppingList({ shoppingListID, item: { ...item, isBought: !item.isBought } })

  item.associatedIDs.forEach((IDs) => {
    const associatedItemID = IDs.itemID
    const associatedListID = IDs.listID

    const itemDetailsInExistingList = getItemFromExistingList({ itemID: associatedItemID, listID: associatedListID }).itemDetails
    const newItemDetailsInExistingList = { ...itemDetailsInExistingList, isBought: !itemDetailsInExistingList.isBought }

    saveItemInExistingList({ listID: associatedListID, itemID: associatedItemID, item: newItemDetailsInExistingList })
  })
}


export function getMissingShoppingListItemsAmount() {
  return [...useExistingShoppingListStore.getState().shoppingList.entries()].filter(([, value]) => !value.isBought).length
}


function createItemInShoppingList({ item, listID, itemID }) {
  const newID = crypto.randomUUID()
    
  const itemAfterAdditionOnShoppingList = {
    ...item, 
    associatedIDs: [{ itemID: itemID, listID: listID, shoppingListID: newID }],
    isOnShoppingList: true,
  }
  
  saveItemInExistingList({ listID, itemID, item: itemAfterAdditionOnShoppingList })
  saveItemInShoppingList({ shoppingListID: newID, item: itemAfterAdditionOnShoppingList })
}

function unmergeItems({ shoppingListItem, itemID, item }) {
  const associatedIDs = shoppingListItem.associatedIDs;

  const index = associatedIDs.findIndex((IDs) => IDs.itemID === itemID);
  associatedIDs.splice(index, 1);

  const substraction = substractItems(shoppingListItem.quantity, shoppingListItem.unit, item.quantity, item.unit);

  return { 
    ...item, 
    quantity: substraction.quantity, 
    unit: substraction.unit, 
    associatedIDs: associatedIDs 
  }
}

function mergeItems({ duplicateItem, updatedItemOnExistingList, item }) {
  const updatedAssociatedIDs = [...duplicateItem.associatedIDs, updatedItemOnExistingList.associatedIDs[0]]

  const sum = addItems(duplicateItem.quantity, duplicateItem.unit, item.quantity, item.unit)

  return {
    ...updatedItemOnExistingList,
    quantity: sum.quantity,
    unit: sum.unit,
    associatedIDs: updatedAssociatedIDs,
  }
}

function getShoppingListIDFromItem(item) {
  if(!item.associatedIDs[0].shoppingListID) {
    return undefined
  }
  return item.associatedIDs[0].shoppingListID;
}
