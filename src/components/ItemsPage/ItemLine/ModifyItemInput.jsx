import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';
import { findItemDetails } from '../../../utils/quantitiesAndUnits';

function ModifyItemInput({ itemID, item }) {
  const listID = useListsStore((state) => state.selectedListID);
  const saveItem = useListsStore((state) => state.saveItem);

  return (
    <input
      className="w-0 grow bg-base-100 text-info rounded-md focus:outline focus:outline-blue-500/50 pl-1"
      onBlur={(event) => saveItem(findItemDetails(event.target.value), itemID, listID)}
      defaultValue={
        item.hasOwnProperty('itemQuantity') && item.itemQuantity !== ''
          ? `${item.itemQuantity}${' '}${item.itemUnit}${' '}${item.itemName}`
          : item.itemName
      }
    />
  );
}

ModifyItemInput.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ModifyItemInput;
