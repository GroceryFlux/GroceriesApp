import React from 'react';
import { useThemeStore } from '../../store/theme/theme';

function ItemTitleInput() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <input
      className={`text-center border-solid border-y-2 rounded-l-lg border-l-2 border-blue-400 p-1 ${
        theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''
      }`}
      placeholder="Bananas"
      defaultValue=""
    />
  );
}

export default ItemTitleInput;
