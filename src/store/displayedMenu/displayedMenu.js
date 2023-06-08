import { create } from 'zustand';

export const usePageStore = create((set) => ({
  displayedMenu: 'listsDisplay',

  setDisplayedPage: (page) => set(() => ({ displayedMenu: page })),
}));

export const useBoughtItemsStore = create((set) => ({
  showBoughtItems: true,
  toggleBoughtItemsVisibility: () => set((state) => ({ showBoughtItems: !state.showBoughtItems })),
}));
