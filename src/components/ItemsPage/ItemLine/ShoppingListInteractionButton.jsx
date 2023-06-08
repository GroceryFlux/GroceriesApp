import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function getIcon(item) {
  if (item.isBought) {
    return <i className="fa-solid fa-check-double"></i>;
  }

  if (item.isOnShoppingList) {
    return <i className="fa-solid fa-check"></i>;
  }

  return <i className="fa-solid fa-plus"></i>;
}

function ShoppingListInteractionButton({ itemID, item }) {
  const toggleShoppingListItem = useListsStore((state) => state.toggleShoppingListItem);

  return (
    <div
      className="mr-3"
      onClick={() => toggleShoppingListItem(itemID, item)}
    >
      {getIcon(item)}
    </div>
  );
}

ShoppingListInteractionButton.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ShoppingListInteractionButton;
