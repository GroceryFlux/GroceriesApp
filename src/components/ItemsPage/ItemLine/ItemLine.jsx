import React from 'react';
import PropTypes from 'prop-types';
import ModifyItemInput from './ModifyItemInput';
import ShoppingListInteractionButton from './ShoppingListInteractionButton';
import DeleteItemButton from './DeleteItemButton';

function ItemLine({ itemID, item }) {
  return (
    <li>
      <div className="flex justify-between">
        <ModifyItemInput
          itemID={itemID}
          item={item}
        />
        <div className="flex gap-2 items-center">
          <ShoppingListInteractionButton
            itemID={itemID}
            item={item}
          />
          <DeleteItemButton itemID={itemID} />
        </div>
      </div>
    </li>
  );
}

ItemLine.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ItemLine;
