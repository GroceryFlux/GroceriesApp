import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function IsItemBoughtCheckBox({ itemID, item }) {
  const toggleItemIsBought = useListsStore((state) => state.toggleItemIsBought);

  return (
    <input
      type="checkbox"
      defaultChecked={item.isBought}
      className="checkbox checkbox-sm checkbox-accent"
      onClick={() => {
        toggleItemIsBought(itemID, item);
      }}
    />
  );
}

IsItemBoughtCheckBox.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default IsItemBoughtCheckBox;
