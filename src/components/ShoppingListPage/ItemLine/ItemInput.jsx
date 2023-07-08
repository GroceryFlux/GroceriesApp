import React from 'react';
import PropTypes from 'prop-types';

function ItemInput({ item }) {

  return (
    <input
      className="bg-base-100"
      defaultValue={item.itemName}
      disabled
    />
  );
}

ItemInput.propTypes = {
  item: PropTypes.object,
};

export default ItemInput;
