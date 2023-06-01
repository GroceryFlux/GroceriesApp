import { create } from 'zustand';

export const useListToDeleteStore = create((set) => ({
  listToDelete: '',
  setListToDelete: (list) => set(() => ({ listToDelete: list })),
}));
