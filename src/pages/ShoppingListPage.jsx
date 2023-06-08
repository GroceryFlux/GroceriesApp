import React from 'react';
import { useListsStore } from '../store/lists/lists';
import ShoppingListHeader from '../components/ShoppingListPage/ShoppingListPageHeader';
import { useBoughtItemsStore } from '../store/displayedMenu/displayedMenu';
import ToggleBoughtItemsButton from '../components/ShoppingListPage/ToggleBoughtItemsButton';
import ItemLine from '../components/ShoppingListPage/ItemLine/ItemLine';

function ShoppingListPage() {
  const shoppingList = useListsStore((state) => state.shoppingList);
  const showBoughtItems = useBoughtItemsStore((state) => state.showBoughtItems);

  if (shoppingList.size === 0) {
    return (
      <>
        <ShoppingListHeader />
        <p className="w-3/4">Your shopping list is empty, please start adding items in your recurrent lists</p>
      </>
    );
  }

  const boughtItems = [];
  const unboughtItems = [];

  shoppingList.forEach((item, itemID) => {
    if (item.isBought) {
      boughtItems.push(
        <ItemLine
          key={itemID}
          itemID={itemID}
          item={item}
        />,
      );
      return;
    }

    unboughtItems.push(
      <ItemLine
        key={itemID}
        itemID={itemID}
        item={item}
      />,
    );
  });

  return (
    <>
      <ShoppingListHeader />
      <h2>Basket</h2>
      <ul className="mb-3 mt-3">{unboughtItems}</ul>
      <div className="flex flex-row gap-3">
        <h2>Completed</h2>
        <ToggleBoughtItemsButton />
      </div>
      {showBoughtItems && <ul className="mb-3 mt-3">{boughtItems}</ul>}
    </>
  );
}

export default ShoppingListPage;
