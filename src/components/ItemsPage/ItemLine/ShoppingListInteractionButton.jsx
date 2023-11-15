import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';
import { CartArrowIcon, CartCheckIcon, HandleBagCheck } from '../../Icons';

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
  const toggleItemOnShoppingList = useListsStore((state) => state.toggleItemOnShoppingList);

  return <button onClick={() => toggleItemOnShoppingList(item)}>{getIcon(item)}</button>;
}

ShoppingListInteractionButton.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ShoppingListInteractionButton;
