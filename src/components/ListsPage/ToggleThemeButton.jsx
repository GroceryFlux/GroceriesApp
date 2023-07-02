import React from 'react';
import { useThemeStore } from '../../store/theme/theme';
import { MoonIcon, SunIcon } from '../Icons';

function ToggleThemeButton() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      className="pt-2.5"
      onClick={toggleTheme}
    >
      {/*theme === 'dark' ? <MoonIcon /> : <SunIcon />*/}

      <label className={`swap ${theme === 'dark' ? 'swap-active' : ''} swap-rotate`}>
        <div className="swap-on">
          <MoonIcon />
        </div>
        <div className="swap-off">
          <SunIcon />
        </div>
      </label>
    </button>
  );
}

export default ToggleThemeButton;
