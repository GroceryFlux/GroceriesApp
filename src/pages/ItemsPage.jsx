import React from 'react';
import { filterItems } from '../utils/filterValue.utils';
import { useListsStore } from '../store/lists/lists';
import LastModifiedText from '../components/ItemsPage/LastModifiedText';
import NewItemForm from '../components/ItemsPage/NewItemForm';
import ItemLine from '../components/ItemsPage/ItemLine/ItemLine';
import SearchItemInput from '../components/ItemsPage/SearchItemInput';
import { useItemFilterStore } from '../store/filtersAndSortBy/itemFilter';
import ItemPageHeader from '../components/ItemsPage/ItemPageHeader';

function ItemsPage() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const itemFilter = useItemFilterStore((state) => state.itemFilter);

  const items = filterItems(itemFilter, list.itemsList).map(([itemID, item]) => (
    <ItemLine
      key={itemID}
      itemID={itemID}
      item={item}
    />
  ));

  return (
    <div className="flex flex-col w-full gap-1 px-10 text-info">
      <div className="flex items-center justify-between pt-4">
        <ItemPageHeader />
      </div>

      <LastModifiedText />

      <div className="flex w-full mt-[0.12rem]">
        <NewItemForm />
      </div>

      <SearchItemInput />

      <ul className="flex flex-col gap-3 mt-[1.3rem]">{items}</ul>
    </div>
  );
}

export default ItemsPage;
