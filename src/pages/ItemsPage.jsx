import React from 'react';
import { filterItems } from '../utils/filterValue.utils';
import { useListsStore } from '../store/lists/lists';
import ListTitleInput from '../components/ItemsPage/ListTitleInput';
import LastModifiedText from '../components/ItemsPage/LastModifiedText';
import NewItemForm from '../components/ItemsPage/NewItemForm';
import ItemLine from '../components/ItemsPage/ItemLine/ItemLine';
import SearchItemInput from '../components/ItemsPage/SearchItemInput';
import { useItemFilterStore } from '../store/filtersAndSortBy/itemFilter';
import Header from '../components/shared/Header'

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
    <div className="flex flex-col w-full gap-8 px-10 text-info">
      <div className="flex items-center justify-between gap-8 pt-4">
        <Header />
      </div>
      <ListTitleInput />
      <LastModifiedText />
      <NewItemForm />
      <div className="flex justify-center">
        <SearchItemInput />
      </div>
      <div className="mx-5 py-3">
        <ul>{items}</ul>
      </div>
    </div>
  );
}

export default ItemsPage;
