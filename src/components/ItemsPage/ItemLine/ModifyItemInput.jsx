import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';
import { extractItemDetails, getDefaultValue } from '../../../utils/quantitiesAndUnits';

function ModifyItemInput({ itemID, item }) {
  const listID = useListsStore((state) => state.selectedListID);
  const saveItem = useListsStore((state) => state.saveItem);

  const defaultValue = getDefaultValue(item);

  return (
    <input
      key={defaultValue}
      className="w-0 grow bg-base-100 text-info rounded-md focus:outline focus:outline-blue-500/50 pl-1"
      onBlur={(event) => saveItem(extractItemDetails(event.target.value), itemID, listID)}
      defaultValue={defaultValue}
    />
  );
}

ModifyItemInput.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ModifyItemInput;
