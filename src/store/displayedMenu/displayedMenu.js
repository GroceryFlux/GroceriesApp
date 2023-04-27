import { create } from "zustand"

export const useDisplayedMenuStore = create((set) => ({
  displayedMenu: 'listsDisplay',

  setDisplayedMenu: (menu) => set(() => ({ displayedMenu: menu }))
}))