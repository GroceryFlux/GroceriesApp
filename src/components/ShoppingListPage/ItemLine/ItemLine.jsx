import React from 'react';
import PropTypes from 'prop-types';
import ItemInput from './ItemInput';
import IsItemBoughtCheckBox from './IsItemBoughtCheckbox';

function ItemLine({ itemID, item, listTitles }) {
  const associatedListTitlesForItem = listTitles
    .map((listTitle) => {
      if (!listTitle) {
        return 'No Title';
      }

      return listTitle;
    })
    .join(', ');

  return (
    <li key={itemID}>
      <div className="flex flex-row gap-2 items-center">
        <IsItemBoughtCheckBox
          item={item}
        />
        <ItemInput item={item} />
        <div className="italic text-xs truncate">{associatedListTitlesForItem}</div>
      </div>
    </li>
  );
}

ItemLine.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
  listTitles: PropTypes.array,
};

export default ItemLine;
