import React from 'react';
import PropTypes from 'prop-types';
import { useListsStore } from '../../store/lists/lists';

function ShoppingListInterractionButton({ itemID, item }) {
  const toggleShoppingListItem = useListsStore((state) => state.toggleShoppingListItem)

  return (
    <div
      className="mr-3"
      onClick={() => toggleShoppingListItem(itemID, item)}
    >
      {item.isBought === true ? (
        <i className="fa-solid fa-check-double"></i>
      ) : item.isOnShoppingList === true ? (
        <i className="fa-solid fa-check"></i>
      ) : (
        <i className="fa-solid fa-plus"></i>
      )}
    </div>
  );
}

ShoppingListInterractionButton.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ShoppingListInterractionButton;
