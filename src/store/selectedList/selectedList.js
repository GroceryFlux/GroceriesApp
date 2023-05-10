import { create } from 'zustand'

export const useSelectedListStore = create((set) => ({
  selectedList: '',
  setSelectedList: (list) => set(() => ({ selectedList: list }))
}))

export const useListToDeleteStore = create((set) => ({
  listToDelete: '',
  setListToDelete: (list) => set(() => ({ listToDelete:list }))
}))