import { create } from 'zustand';
import {
  getLocalExistingLists,
  getLocalShoppingList,
  setLocalExistingLists,
  setLocalShoppingList,
} from '../../utils/localStorage.utils';

export const useListsStore = create((set) => ({
  existingLists: getLocalExistingLists(),
  shoppingList: getLocalShoppingList(),

  saveExistingLists: (listID, list) =>
    set((state) => {
      const tempoExistingLists = new Map(state.existingLists);
      tempoExistingLists.set(listID, list);
      setLocalExistingLists(tempoExistingLists);
      return { existingLists: tempoExistingLists };
    }),

  saveShoppingList: (itemID, item) =>
    set((state) => {
      if (item.addToShoppingList) {
        const tempoShoppingList = new Map(state.shoppingList);
        tempoShoppingList.set(itemID, item);
        setLocalShoppingList(tempoShoppingList);
        const currentList = state.existingLists.get(item.listID);
        state.saveExistingLists(item.listID, { ...currentList, itemsList: currentList.itemsList.set(itemID, item) });
        return { shoppingList: tempoShoppingList };
      }
      return state;
    }),

  deleteList: (listID) =>
    set((state) => {
      const tempoExistingLists = new Map(state.existingLists);
      const tempoShoppingList = new Map();
      const actualShoppingList = [...state.shoppingList];
      actualShoppingList.forEach(([itemID, item]) => {
        if (item.listID !== listID) {
          tempoShoppingList.set(itemID, item);
        }
      });
      tempoExistingLists.delete(listID);
      setLocalExistingLists(tempoExistingLists);
      setLocalShoppingList(tempoShoppingList);
      return { existingLists: tempoExistingLists, shoppingList: tempoShoppingList };
    }),

  deleteCompleteShoppingList: () =>
    set((state) => {
      [...state.shoppingList.entries()].forEach(([itemID, item]) => {
        state.saveExistingLists(item.listID, {
          ...state.existingLists.get(item.listID),
          itemsList: state.existingLists
            .get(item.listID)
            .itemsList.set(itemID, { ...item, addToShoppingList: false, isBought: false }),
        });
        setLocalExistingLists(state.existingLists);
      });
      setLocalShoppingList(new Map());
      return { shoppingList: new Map() };
    }),

  deleteItemShoppingList: (itemID, item) =>
    set((state) => {
      const tempoShoppingList = new Map(state.shoppingList);
      state.saveExistingLists(item.listID, {
        ...state.existingLists.get(item.listID),
        itemsList: state.existingLists
          .get(item.listID)
          .itemsList.set(itemID, { ...item, addToShoppingList: false, isBought: false }),
      });
      tempoShoppingList.delete(itemID);
      setLocalShoppingList(tempoShoppingList);
      return { shoppingList: tempoShoppingList };
    }),
}));
