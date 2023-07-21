import { create } from 'zustand';

export const useItemFilterStore = create((set) => ({
  showItemFilter: false,
  itemFilter: '',
  setItemFilter: (value) => set(() => ({ itemFilter: value })),
  resetItemFilter: () => set(() => ({ itemFilter: '' })),
  toggleItemFilter: () => set((state) => ({ showItemFilter: !state.showItemFilter })),
}));
