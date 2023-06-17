import { create } from 'zustand';

export const useListFilterStore = create((set) => ({
  displayListFilter: false,
  listFilter: '',
  setListFilter: (value) => set(() => ({ listFilter: value })),
  resetListFilter: () => set(() => ({ listFilter: '' })),
  setDisplayListFilter: () => set((state) => ({ displayListFilter: !state.displayListFilter }))
}));
