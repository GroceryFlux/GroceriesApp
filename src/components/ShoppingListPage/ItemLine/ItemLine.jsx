import React from 'react';
import PropTypes from 'prop-types';
import ItemInput from './ItemInput';
import IsItemBoughtCheckBox from './IsItemBoughtCheckbox';

function ItemLine({ itemID, item, listTitle }) {
  return (
    <li key={itemID}>
      <div className="flex flex-row gap-2 items-center">
        <IsItemBoughtCheckBox
          itemID={itemID}
          item={item}
        />
        <ItemInput item={item} />
        <div className="italic text-xs truncate">
          {listTitle ? listTitle : 'No title'}
        </div>
      </div>
    </li>
  );
}

ItemLine.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
  listTitle: PropTypes.string,
};

export default ItemLine;
