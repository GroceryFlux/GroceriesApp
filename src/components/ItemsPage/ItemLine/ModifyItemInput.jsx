import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function ModifyItemInput({ itemID, item }) {
  const listID = useListsStore((state) => state.selectedListID);
  const saveItemName = useListsStore((state) => state.saveItemName);

  return (
    <input
      className="bg-base-100 text-info"
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
