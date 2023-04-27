import { create } from 'zustand'

export const useSelectedListStore = create((set) => ({
  selectedList: '',
  setSelectedList: (list) => set(() => ({ selectedList: list }))
}))