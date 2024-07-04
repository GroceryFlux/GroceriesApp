import React from 'react';
import PropTypes from 'prop-types';
import { stringifyItemNameQuantityUnit } from '../../../utils/quantitiesAndUnits';

function ItemInput({ item }) {
  const value = stringifyItemNameQuantityUnit(item);

  return (
    <input
      className={`bg-base-100 opacity-1 ${item.isBought ? 'text-slate-600' : 'text-info'}`}
      value={value}
      readOnly={true}
    />
  );
}

ItemInput.propTypes = {
  item: PropTypes.object,
};

export default ItemInput;
