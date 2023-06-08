import React from 'react';
import PropTypes from 'prop-types';
import ModifyItemInput from './ModifyItemInput';
import ShoppingListInteractionButton from './ShoppingListInteractionButton';
import DeleteItemButton from './DeleteItemButton';

function ItemLine({ itemID, item }) {
  return (
    <li>
      <div className="flex flex-row justify-between py-1">
        <ModifyItemInput
          itemID={itemID}
          item={item}
        />
        <ShoppingListInteractionButton
          itemID={itemID}
          item={item}
        />
        <DeleteItemButton itemID={itemID} />
      </div>
    </li>
  );
}

ItemLine.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ItemLine;
