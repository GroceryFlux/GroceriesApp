import React from 'react';
import PropTypes from 'prop-types';
import { CartArrowIcon, CartCheckIcon, HandleBagCheck } from '../../Icons';
import { toggleItemOnShoppingList } from '../../../UseCases/ExistingLists/BusinessLogic';

function getIcon(item) {
  if (item.isBought) {
    return <HandleBagCheck />;
  }

  if (item.isOnShoppingList) {
    return <CartCheckIcon />;
  }

  return <CartArrowIcon />;
}

function ShoppingListInteractionButton({ item }) {

  return <button onClick={() => toggleItemOnShoppingList(item)}>{getIcon(item)}</button>;
}

ShoppingListInteractionButton.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ShoppingListInteractionButton;
