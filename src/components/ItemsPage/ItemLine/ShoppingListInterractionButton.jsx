import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../../store/lists/lists';

function ShoppingListInterractionButton({ itemID, item }) {
  const toggleShoppingListItem = useListsStore((state) => state.toggleShoppingListItem);

  let shoppingInteractionIcon;

  switch (item.isBought) {
  case true:
    shoppingInteractionIcon = <i className="fa-solid fa-check-double"></i>;
    break;
  case false:
    item.isOnShoppingList
      ? (shoppingInteractionIcon = <i className="fa-solid fa-check"></i>)
      : (shoppingInteractionIcon = <i className="fa-solid fa-plus"></i>);
    break;
  }

  return (
    <div
      className="mr-3"
      onClick={() => toggleShoppingListItem(itemID, item)}
    >
      {shoppingInteractionIcon}
    </div>
  );
}

ShoppingListInterractionButton.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ShoppingListInterractionButton;
