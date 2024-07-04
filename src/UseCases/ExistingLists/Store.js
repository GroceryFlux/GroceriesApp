import { create } from 'zustand';
import { getLocalExistingLists, setLocalExistingLists } from '../../utils/localStorage.utils';

export const useExistingListsStore = create((set) => ({
  existingLists: getLocalExistingLists(),

  saveExistingListsInStore(newExistingLists) {
    setLocalExistingLists(newExistingLists);

    set(() => ({ existingLists: newExistingLists }));
  },
}));
