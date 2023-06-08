import { create } from 'zustand';

export const useListFilterStore = create((set) => ({
  listFilter: '',
  setListFilter: (value) => set(() => ({ listFilter: value })),
  resetListFilter: () => set(() => ({ listFilter: '' })),
}));
