import React from 'react';
import PropTypes from 'prop-types';

function ItemInput({ item }) {
  return (
    <input
      className={`bg-base-100 opacity-1 ${item.isBought ? 'text-slate-600' : 'text-info'}`}
      defaultValue={item.itemName}
      readOnly={true}
    />
  );
}

ItemInput.propTypes = {
  item: PropTypes.object,
};

export default ItemInput;
