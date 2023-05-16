import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  listFilter: '',
  itemFilter: '',
  setItemFilter: (value) => set(() => ({ itemFilter: value })),
  setListFilter: (value) => set(() => ({ listFilter: value })),
  resetItemFilter: () => set(() => ({ itemFilter: '' })),
  resetListFilter: () => set(() => ({ listFilter: '' })),
}));
