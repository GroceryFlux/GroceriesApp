import { create } from 'zustand';

export const useSortByStore = create((set) => ({
  sortType: 'sort',
  setSortType: (value) => set(() => ({ sortType: value })),
}));
