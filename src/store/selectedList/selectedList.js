import { create } from 'zustand';

export const useSelectedListIDStore = create((set) => ({
  selectedListID: '',
  setSelectedListID: (ID) => set(() => ({ selectedListID: ID })),
}));

export const useListToDeleteStore = create((set) => ({
  listToDelete: '',
  setListToDelete: (list) => set(() => ({ listToDelete: list })),
}));
