import React from 'react';
import { useThemeStore } from '../../store/theme/theme';

function ThemeToggleButton() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className="mt-0.5">
      <button
        onClick={toggleTheme}
        className=""
      >
        {theme === 'dark' ? <i className="fa-regular fa-moon"></i> : <i className="fa-regular fa-sun"></i>}
      </button>
    </div>
  );
}

export default ThemeToggleButton;
