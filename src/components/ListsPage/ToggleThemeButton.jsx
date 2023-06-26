import React from 'react';
import { useThemeStore } from '../../store/theme/theme';
import { MoonIcon, SunIcon } from '../Icons';

function ToggleThemeButton() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      className="pt-0.5"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default ToggleThemeButton;
