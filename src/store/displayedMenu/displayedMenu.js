import { create } from 'zustand';

export const useDisplayedMenuStore = create((set) => ({
  displayedMenu: 'listsDisplay',

  setDisplayedMenu: (menu) => set(() => ({ displayedMenu: menu })),
}));

export const useDisplayBoughtItemsStore = create((set) => ({
  displayBoughtItems: true,
  toggleDisplayBoughtItems: () => set((state) => ({ displayBoughtItems: !state.displayBoughtItems })),
}));
