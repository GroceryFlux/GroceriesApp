import React from 'react';
import PropTypes from 'prop-types';
import { getDefaultValue } from '../../../utils/quantitiesAndUnits';
import { saveItemFromInputInExistingList } from '../../../UseCases/ExistingLists/BusinessLogic';
import { useSelectedListStore } from '../../../UseCases/SelectedList/Store';

function ModifyItemInput({ itemID, item }) {
  const listID = useSelectedListStore((state) => state.selectedListID);

  const defaultValue = getDefaultValue(item);

  return (
    <input
      key={defaultValue}
      className="w-0 grow bg-base-100 text-info rounded-md focus:outline focus:outline-blue-500/50 pl-1"
      onBlur={(event) => saveItemFromInputInExistingList({ input: event.target.value, itemID, listID })}
      defaultValue={defaultValue}
    />
  );
}

ModifyItemInput.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ModifyItemInput;
