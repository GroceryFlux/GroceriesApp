import { create } from "zustand";


export const useFilterStore = create((set) => ({
  filter: '',
  listFilter: '',
  itemFilter:'', 
  setFilter: (value) => set(() => ({ filter: value })),
  resetFilters: () => set(() => ({ filter: '', listFilter: '', itemFilter: '' }))
}))
