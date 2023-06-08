import { create } from 'zustand';

export const useItemFilterStore = create((set) => ({
  itemFilter: '',
  setItemFilter: (value) => set(() => ({ itemFilter: value })),
  resetItemFilter: () => set(() => ({ itemFilter: '' })),
}));
