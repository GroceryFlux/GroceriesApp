import { create } from 'zustand';

export const useSortByStore = create((set) => ({
  sortType: 'last_modified',
  setSortType: (value) => set(() => ({ sortType: value })),
}));
