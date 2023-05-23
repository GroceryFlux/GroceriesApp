import { create } from 'zustand';

export const usePageStore = create((set) => ({
  displayedPage: 'listsDisplay',

  setDisplayedPage: (page) => set(() => ({ displayedPage: page })),
}));

export const useBoughtItemsStore = create((set) => ({
  showBoughtItems: true,
  toggleBoughtItemsVisibility: () => set((state) => ({ showBoughtItems: !state.showBoughtItems })),
}));
