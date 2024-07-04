import { create } from 'zustand';

export const useSelectedListStore = create((set) => ({
  selectedListID: undefined,

  setSelectedListID(listID) {
    set(() => ({ selectedListID: listID }));
  },
}));
