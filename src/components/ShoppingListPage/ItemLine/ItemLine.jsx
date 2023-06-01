import React from 'react';
import PropTypes from 'prop-types';
import ItemInput from './ItemInput';
import ToggleIsItemBoughtButton from './ToggleIsItemBoughtButton';

function ItemLine({ itemID, item }) {
  return (
    <li key={itemID}>
      <div className="flex flex-row gap-2">
        <ToggleIsItemBoughtButton
          itemID={itemID}
          item={item}
        />
        <ItemInput item={item} />
      </div>
    </li>
  );
}

ItemLine.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ItemLine;
