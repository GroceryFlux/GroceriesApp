import React from 'react';
import PropTypes from 'prop-types';
import ModifyItemInput from './ModifyItemInput';
import ShoppingListInteractionButton from './ShoppingListInteractionButton';
import DeleteItemButton from './DeleteItemButton';

function ItemLine({ itemID, item }) {
  return (
    <li>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <ShoppingListInteractionButton
            itemID={itemID}
            item={item}
          />
          <ModifyItemInput
            itemID={itemID}
            item={item}
          />
        </div>
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
