import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function IsItemBoughtCheckBox({ itemID, item }) {
  const saveShoppingList = useListsStore((state) => state.saveShoppingList);

  return (
    <input
      type="checkbox"
      defaultChecked={item.isBought}
      className="checkbox checkbox-xs"
      onClick={() => {
        saveShoppingList(itemID, { ...item, isBought: !item.isBought });
      }}
    />
  );
}

IsItemBoughtCheckBox.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default IsItemBoughtCheckBox;
