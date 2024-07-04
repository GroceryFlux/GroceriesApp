import React from 'react';
import PropTypes from 'prop-types';
import { toggleItemIsBought } from '../../../UseCases/ShoppingList/BusinessLogic';

function IsItemBoughtCheckBox({ itemID, item }) {
  return (
    <input
      type="checkbox"
      defaultChecked={item.isBought}
      className="checkbox checkbox-sm checkbox-accent"
      onClick={() => {
        toggleItemIsBought({ itemID, item });
      }}
    />
  );
}

IsItemBoughtCheckBox.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default IsItemBoughtCheckBox;
