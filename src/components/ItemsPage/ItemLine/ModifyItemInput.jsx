import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function ModifyItemInput({ itemID, item }) {
  const listID = useListsStore((state) => state.selectedListID);
  const saveItemName = useListsStore((state) => state.saveItemName);

  return (
    <input
      className="w-0 grow bg-base-100 text-info rounded-md focus:outline focus:outline-blue-500/50 pl-1"
      onBlur={(event) => saveItemName(event.target.value, itemID, listID)}
      defaultValue={item.itemName}
    />
  );
}

ModifyItemInput.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ModifyItemInput;
