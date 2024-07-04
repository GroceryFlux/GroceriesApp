import { create } from 'zustand';
import { getLocalShoppingList, setLocalShoppingList } from '../../utils/localStorage.utils';

export const useExistingShoppingListStore = create((set, get) => ({
  shoppingList: getLocalShoppingList(),
  animation: '-translate-y-1/2',
  timeoutID: 0,

  saveShoppingListInStore(shoppingList) {
    setLocalShoppingList(shoppingList);

    set(() => ({ shoppingList: shoppingList }));
  },

  startCartAnimation() {
    clearTimeout(get().timeoutID);
    set(() => ({ animation: '-translate-y-1/4' }));

    const timeoutID = setTimeout(() => set(() => ({ animation: '-translate-y-1/2' })), 150);
    set(() => ({ timeoutID }));
  },
}));
