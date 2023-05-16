import React from 'react';
import { useListsStore } from '../store/lists/lists';
import ShoppingListHeader from '../components/ShoppingListPage/ShoppingListPageHeader';
import ItemLine from '../components/ShoppingListPage/ItemLine';
import DisplayBoughtItemsButton from '../components/ShoppingListPage/DisplayBoughtItemsButton';
import { useDisplayBoughtItemsStore } from '../store/displayedMenu/displayedMenu';

function ShoppingListPage() {

  const shoppingList = useListsStore((state) => state.shoppingList)
  const displayBoughtItems = useDisplayBoughtItemsStore((state) => state.displayBoughtItems)
  
  
  return(

    <>
      <ShoppingListHeader />
      {shoppingList.size === 0 | shoppingList.length === 0 ? 
        <p className="w-3/4">Your shopping list is empty, please start adding items in your reccurent lists</p>
        :
        <>
          <h2>Basket</h2>
          <ul className="mb-3 mt-3">
            {[...shoppingList.entries()].map(([itemID, item]) => (
              item.isBought === false ?
                <ItemLine
                  key={itemID}
                  itemID={itemID}
                  item={item}
                />
                : null
            ))}
          </ul>
          <div className="flex flex-row gap-3">
            <h2>Completed</h2>
            <DisplayBoughtItemsButton />
          </div>
          {displayBoughtItems === true ? 
            <ul className="mb-3 mt-3">
              {[...shoppingList.entries()].map(([itemID, item]) => (
                item.isBought === true ?
                  <ItemLine 
                    key={itemID}
                    itemID={itemID}
                    item={item}
                  />
                  : null
              ))}
            </ul>
            : null}
        </>
      }
    </>
  )
}


export default ShoppingListPage