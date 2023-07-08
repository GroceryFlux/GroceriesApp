import React from 'react';
import { useListsStore } from '../store/lists/lists';
import { useBoughtItemsStore } from '../store/displayedMenu/displayedMenu';
import ToggleBoughtItemsButton from '../components/ShoppingListPage/ToggleBoughtItemsButton';
import ItemLine from '../components/ShoppingListPage/ItemLine/ItemLine';
import ClearShoppingListButton from '../components/ShoppingListPage/ClearShoppingListButton';
import Header from '../components/shared/Header';

function ShoppingListPage() {
  const shoppingList = useListsStore((state) => state.shoppingList);
  const showBoughtItems = useBoughtItemsStore((state) => state.showBoughtItems);

  if (shoppingList.size === 0) {
    return (
      <div className="flex flex-col w-full gap-8 px-10 text-info">
        <div className="flex items-center justify-between gap-8 pt-4">
          <Header />
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="text-2xl">Shopping list</div>
          <div className="flex gap-4">
            <ClearShoppingListButton />
          </div>
        </div>
        <p className="text-center">Your shopping list is empty, please start adding items in your recurrent lists</p>
      </div>
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
      <div className="flex flex-col w-full gap-8 px-10 text-info">
        <div className="flex items-center justify-between gap-8 pt-4">
          <Header />
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="text-2xl">Shopping list</div>
          <div className="flex gap-4">
            <ClearShoppingListButton />
          </div>
        </div>
        <ul className="">{unboughtItems}</ul>
        <div className="flex flex-row gap-3">
          <h2>Purchased</h2>
          <ToggleBoughtItemsButton />
        </div>
        {showBoughtItems && (
          <ul>{boughtItems}</ul>
        )}
      </div>
    </>
  );
}

export default ShoppingListPage;
