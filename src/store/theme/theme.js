import { create } from 'zustand';
import { getInitialTheme, setTheme } from '../../utils/localStorage.utils';

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    get().theme === 'dark' ? setTheme('light') : setTheme('dark')

    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }));
  },
}));
