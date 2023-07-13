import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';
import { EuroIcon, OutlineCartIcon, PlusNoRoundIcon } from '../../Icons';

function getIcon(item) {
  if (item.isBought) {
    return <EuroIcon />;
  }

  if (item.isOnShoppingList) {
    return <OutlineCartIcon />;
  }

  return <PlusNoRoundIcon />;
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
