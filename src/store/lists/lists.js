import { create } from 'zustand';
import {
  getLocalExistingLists,
  getLocalShoppingList,
  setLocalExistingLists,
  setLocalShoppingList,
} from '../../utils/localStorage.utils';
import { findItemDuplicateId } from '../../utils/duplicates';
import { addItems, areItemsCompatible, substractItems } from '../../utils/quantitiesAndUnits';

export const useListsStore = create((set, get) => ({
  existingLists: getLocalExistingLists(),
  shoppingList: getLocalShoppingList(),
  selectedListID: undefined,
  animation: '-translate-y-1/2',
  timeoutId: 0,

  startAnimation: () => {
    clearTimeout(get().timeoutId);

    set(() => ({ animation: '-translate-y-1/4' }));

    const timeoutId = setTimeout(() => set(() => ({ animation: '-translate-y-1/2' })), 150);

    set(() => ({ timeoutId }));
  },

  //functions used for lists :

  saveExistingLists: (listID, list) =>
    set((state) => {
      const tempoExistingLists = new Map(state.existingLists);
      tempoExistingLists.set(listID, list);
      setLocalExistingLists(tempoExistingLists);
      return { existingLists: tempoExistingLists };
    }),

  setSelectedListID: (listID) =>
    set(() => {
      return { selectedListID: listID };
    }),

  createList: () => {
    const listID = crypto.randomUUID();
    const list = { title: '', timeStamp: undefined, itemsList: new Map() };

    get().setSelectedListID(listID);
    get().saveExistingLists(listID, list);
  },

  deleteList: (listID) =>
    set((state) => {
      const tempoExistingLists = new Map(state.existingLists);
      const tempoShoppingList = new Map();
      const actualShoppingList = [...state.shoppingList];
      actualShoppingList.forEach(([itemID, item]) => {
        if (item.associatedIDs[0].listID !== listID) {
          tempoShoppingList.set(itemID, item);
        }
      });
      tempoExistingLists.delete(listID);
      setLocalExistingLists(tempoExistingLists);
      setLocalShoppingList(tempoShoppingList);
      return { existingLists: tempoExistingLists, shoppingList: tempoShoppingList };
    }),

  //functions used for items

  saveItem: (extractedItemDetails, itemID, listID) => {
    const oldItem = get().existingLists.get(listID).itemsList.get(itemID);
    get().removeItemFromShoppingList(oldItem);

    const list = get().existingLists.get(listID);
    const item = list.itemsList.get(itemID);
    item.itemName = extractedItemDetails.itemName;
    item.quantity = extractedItemDetails.quantity;
    item.unit = extractedItemDetails.unit;
    list.timeStamp = Date.now();

    const newItem = list.itemsList.get(itemID);
    get().saveExistingLists(listID, list);
    get().addItemOnShoppingList(newItem);
  },

  saveNewItem: (extractedItemDetails, list, listID) => {
    const newID = crypto.randomUUID();
    list.itemsList.set(newID, {
      itemName: extractedItemDetails.itemName,
      isOnShoppingList: false,
      isBought: false,
      associatedIDs: [{ itemID: newID, listID: listID }],
      quantity: extractedItemDetails.quantity,
      unit: extractedItemDetails.unit,
    });
    list.timeStamp = Date.now();
    get().saveExistingLists(listID, list);
  },

  deleteItem: (listID, itemID) => {
    const list = get().existingLists.get(listID);
    const item = list.itemsList.get(itemID);

    if (item.isOnShoppingList) {
      get().deleteItemFromShoppingList(item);
    }

    list.itemsList.delete(itemID);
    list.timeStamp = Date.now();

    get().saveExistingLists(listID, list);
  },

  updateItemFromShopplingList: (item, newItem) => {
    const listDetails = get().existingLists.get(item.associatedIDs[0].listID);
    const newItemsList = new Map(listDetails.itemsList);

    newItemsList.set(item.associatedIDs[0].itemID, newItem);
    get().saveExistingLists(item.associatedIDs[0].listID, { ...listDetails, itemsList: newItemsList });
  },

  toggleItemIsBought: (itemID, item) => {
    get().saveShoppingList(itemID, { ...item, isBought: !item.isBought });

    item.associatedIDs.forEach((IDs) => {
      const listID = IDs.listID;
      const itemID = IDs.itemID;

      const listDetails = get().existingLists.get(listID);
      const itemDetails = listDetails.itemsList.get(itemID);

      const newItemsList = new Map(listDetails.itemsList).set(itemID, { ...itemDetails, isBought: !item.isBought });

      get().saveExistingLists(listID, { ...listDetails, itemsList: newItemsList });
    });
  },

  toggleItemOnShoppingList: (item) => {
    if (item.isOnShoppingList) {
      get().removeItemFromShoppingList(item);
      return;
    }

    get().addItemOnShoppingList({ ...item, isOnShoppingList: true, isBought: false });
  },

  //functions used for shoppingList

  saveShoppingList: (id, item) => {
    const newShoppingList = new Map(get().shoppingList);

    newShoppingList.set(id, item);
    setLocalShoppingList(newShoppingList);

    set(() => {
      return { shoppingList: newShoppingList };
    });
  },

  addItemOnShoppingList: (item) => {
    get().startAnimation();

    const newID = crypto.randomUUID();

    const originalItemId = findItemDuplicateId(get().shoppingList, item.itemName);

    const itemID = item.associatedIDs[0].itemID;
    const listID = item.associatedIDs[0].listID;

    if (!originalItemId) {
      get().saveShoppingList(newID, { ...item, isOnShoppingList: true });

      const newItemDetails = {
        ...item,
        associatedIDs: [{ itemID: itemID, listID: listID, shoppingListID: newID }],
        isOnShoppingList: true,
      };
      get().updateItemFromShopplingList(item, newItemDetails);

      return;
    }

    const existingQuantity = get().shoppingList.get(originalItemId).quantity;
    const existingUnit = get().shoppingList.get(originalItemId).unit;
    const duplicateQuantity = item.quantity;
    const duplicateUnit = item.unit;

    const itemsAreComptible = areItemsCompatible(existingQuantity, existingUnit, duplicateQuantity, duplicateUnit);

    const existingIsBought = get().shoppingList.get(originalItemId).isBought;
    const duplicateIsBought = item.isBought;

    const haveSameIsBought = existingIsBought === duplicateIsBought;

    if (!itemsAreComptible || !haveSameIsBought) {
      get().saveShoppingList(newID, { ...item, isOnShoppingList: true });

      const newItemDetails = {
        ...item,
        associatedIDs: [{ itemID: itemID, listID: listID, shoppingListID: newID }],
        isOnShoppingList: true,
      };
      get().updateItemFromShopplingList(item, newItemDetails);

      return;
    }

    const existingAssociatedIDs = get().shoppingList.get(originalItemId).associatedIDs;

    const updatedIDs = [...existingAssociatedIDs, { itemID: itemID, listID: listID }];

    const summedItem = addItems(existingQuantity, existingUnit, duplicateQuantity, duplicateUnit);

    get().saveShoppingList(originalItemId, {
      ...item,
      quantity: summedItem.quantity,
      unit: summedItem.unit,
      associatedIDs: updatedIDs,
      isOnShoppingList: true,
    });

    const newItemDetails = {
      ...item,
      associatedIDs: [{ itemID: itemID, listID: listID, shoppingListID: originalItemId }],
      isOnShoppingList: true,
    };
    get().updateItemFromShopplingList(item, newItemDetails);
  },

  removeItemFromShoppingList: (item) => {
    const associatedShoppingListID = item.associatedIDs[0].shoppingListID;

    const itemID = item.associatedIDs[0].itemID;
    const listID = item.associatedIDs[0].listID;

    if (!associatedShoppingListID) {
      return;
    }

    const shoppingListItem = get().shoppingList.get(associatedShoppingListID);

    const itemsAreComptible = areItemsCompatible(
      shoppingListItem.quantity,
      shoppingListItem.unit,
      item.quantity,
      item.unit,
    );
    const shoppingListQtyIsBigger = shoppingListItem.quantity > item.quantity;

    if (itemsAreComptible && shoppingListQtyIsBigger) {
      const itemDetails = get().shoppingList.get(associatedShoppingListID);
      const associatedIDs = itemDetails.associatedIDs;

      const index = associatedIDs.findIndex((IDs) => IDs.itemID === itemID);

      associatedIDs.splice(index, 1);

      const substraction = substractItems(shoppingListItem.quantity, shoppingListItem.unit, item.quantity, item.unit);

      get().saveShoppingList(associatedShoppingListID, {
        ...item,
        quantity: substraction.quantity,
        unit: substraction.unit,
        associatedIDs: associatedIDs,
      });

      const newItemDetails = {
        ...item,
        associatedIDs: [{ itemID: itemID, listID: listID }],
        isOnShoppingList: false,
        isBought: false,
      };
      get().updateItemFromShopplingList(item, newItemDetails);

      return;
    }

    get().deleteItemFromShoppingList(item);
  },

  clearShoppingList: () => {
    const state = get();

    state.shoppingList.forEach((item) => {
      item.associatedIDs.forEach((IDs) => {
        const listID = IDs.listID;
        const itemID = IDs.itemID;
        const itemDetails = get().existingLists.get(listID).itemsList.get(itemID);

        state.saveExistingLists(listID, {
          ...state.existingLists.get(listID),
          itemsList: state.existingLists
            .get(listID)
            .itemsList.set(itemID, {
              ...itemDetails,
              isOnShoppingList: false,
              isBought: false,
              associatedIDs: [{ itemID: itemID, listID: listID }],
            }),
        });
      });
    });

    setLocalShoppingList(new Map());

    set(() => ({
      shoppingList: new Map(),
    }));
  },

  getMissingItemsAmount: () => {
    return [...get().shoppingList.entries()].filter(([, value]) => !value.isBought).length;
  },

  deleteItemFromShoppingList: (item) => {
    const newShoppingList = new Map(get().shoppingList);

    const listID = item.associatedIDs[0].listID;
    const itemID = item.associatedIDs[0].itemID;
    const shoppingListID = item.associatedIDs[0].shoppingListID;

    get().saveExistingLists(listID, {
      ...get().existingLists.get(listID),
      itemsList: get()
        .existingLists.get(listID)
        .itemsList.set(itemID, {
          ...item,
          isOnShoppingList: false,
          isBought: false,
          associatedIDs: [{ itemID: itemID, listID: listID }],
        }),
    });

    newShoppingList.delete(shoppingListID);
    setLocalShoppingList(newShoppingList);

    set(() => ({ shoppingList: newShoppingList }));
    get().startAnimation();
  },
}));
