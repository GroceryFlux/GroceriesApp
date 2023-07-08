import { create } from 'zustand';

export const useListFilterStore = create((set) => ({
  showListFilter: false,
  listFilter: '',
  setListFilter: (value) => set(() => ({ listFilter: value })),
  resetListFilter: () => set(() => ({ listFilter: '' })),
  toggleListFilter: () => set((state) => ({ showListFilter: !state.showListFilter })),
}));
