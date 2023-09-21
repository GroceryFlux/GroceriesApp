import { create } from 'zustand';

export const usePageStore = create((set) => ({
  displayedMenu: 'listsDisplay',
  isShoppingListVisible: false,

  toggleShoppingListVisible: () => set((state) => ({ isShoppingListVisible: !state.isShoppingListVisible })),
  setDisplayedPage: (page) => set(() => ({ displayedMenu: page })),
}));

export const useBoughtItemsStore = create((set) => ({
  showBoughtItems: true,
  toggleBoughtItemsVisibility: () => set((state) => ({ showBoughtItems: !state.showBoughtItems })),
}));
