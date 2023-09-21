import React from 'react';
import PropTypes from 'prop-types';
import ModifyItemInput from './ModifyItemInput';
import ShoppingListInteractionButton from './ShoppingListInteractionButton';
import DeleteItemButton from './DeleteItemButton';
import { HandleIcon } from '../../Icons/index.js';

function ItemLine({ itemID, item }) {
  return (
    <li>
      <div className="flex justify-between gap-2 items-center">
        <div className="flex w-full gap-1">
          <div className="text-slate-600">
            <HandleIcon />
          </div>

          <ModifyItemInput
            itemID={itemID}
            item={item}
          />
        </div>

        <div className="flex gap-4">
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
