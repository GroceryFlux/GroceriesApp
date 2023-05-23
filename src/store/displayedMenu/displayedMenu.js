import { create } from 'zustand';

export const useDisplayedMenuStore = create((set) => ({
  displayedMenu: 'listsDisplay',

  setDisplayedMenu: (menu) => set(() => ({ displayedMenu: menu })),
}));

export const useBoughtItemsStore = create((set) => ({
  showBoughtItems: true,
  toggleBoughtItemsVisibility: () => set((state) => ({ showBoughtItems: !state.showBoughtItems })),
}));
