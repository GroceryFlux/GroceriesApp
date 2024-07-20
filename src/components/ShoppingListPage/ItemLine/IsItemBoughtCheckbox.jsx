import React from 'react';
import PropTypes from 'prop-types';
import { toggleItemIsBought } from '../../../UseCases/ShoppingList/BusinessLogic';

function IsItemBoughtCheckBox({ item }) {
  return (
    <input
      type="checkbox"
      defaultChecked={item.isBought}
      className="checkbox checkbox-sm checkbox-accent"
      onClick={() => {
        toggleItemIsBought({ item });
      }}
    />
  );
}

IsItemBoughtCheckBox.propTypes = {
  item: PropTypes.object,
};

export default IsItemBoughtCheckBox;
