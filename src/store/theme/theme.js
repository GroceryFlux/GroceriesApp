import { create } from 'zustand';
import { getTheme, setTheme } from '../../utils/localStorage.utils';

export const useThemeStore = create((set) => ({
  theme: getTheme(),
  toggleTheme: () => {
    set((state) => ((
      state.theme === 'night' ? setTheme('light') : setTheme('night'),
      { theme: state.theme === 'night' ? 'light' : 'night' }
    )));
  },
}));
