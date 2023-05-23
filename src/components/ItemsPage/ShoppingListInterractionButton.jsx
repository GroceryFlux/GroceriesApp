import React from 'react';
import PropTypes from 'prop-types';
import { useSelectedListIDStore } from '../../store/selectedList/selectedList';
import { useListsStore } from '../../store/lists/lists';

function ShoppingListInterractionButton({ itemID, item }) {
  const listID = useSelectedListIDStore((state) => state.selectedListID);
  const saveShoppingList = useListsStore((state) => state.saveShoppingList);
  const deleteItemShoppingList = useListsStore((state) => state.deleteItemShoppingList);

  return (
    <div
      className="mr-3"
      onClick={() => {
        item.addToShoppingList === false
          ? saveShoppingList(itemID, { ...item, listID: listID, addToShoppingList: true, isBought: false })
          : deleteItemShoppingList(itemID, item);
      }}
    >
      {item.isBought === true ? (
        <i className="fa-solid fa-check-double"></i>
      ) : item.addToShoppingList === true ? (
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
