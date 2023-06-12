import React from 'react';
import PropTypes from 'prop-types';
import { useThemeStore } from '../../../store/theme/theme';

function ItemInput({ item }) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <input
      className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-white'}`}
      defaultValue={item.itemName}
      disabled
    />
  );
}

ItemInput.propTypes = {
  item: PropTypes.object,
};

export default ItemInput;
