import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';
import { BagCheck, CartArrowIcon, CartCheckIcon, MinimalisticBagCheck, HandleBagCheck } from '../../Icons';

function getIcon(item) {
  if (item.isBought) {
    return <HandleBagCheck />;
  }

  if (item.isOnShoppingList) {
    return <CartCheckIcon />;
  }

  return <CartArrowIcon />;
}

function ShoppingListInteractionButton({ itemID, item }) {
  const toggleShoppingListItem = useListsStore((state) => state.toggleShoppingListItem);

  return <button onClick={() => toggleShoppingListItem(itemID, item)}>{getIcon(item)}</button>;
}

ShoppingListInteractionButton.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ShoppingListInteractionButton;
