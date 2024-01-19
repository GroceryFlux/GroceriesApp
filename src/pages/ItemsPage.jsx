import React from 'react';
import { filterItems } from '../utils/filterValue.utils';
import LastModifiedText from '../components/ItemsPage/LastModifiedText';
import NewItemForm from '../components/ItemsPage/NewItemForm';
import ItemLine from '../components/ItemsPage/ItemLine/ItemLine';
import SearchItemInput from '../components/ItemsPage/SearchItemInput';
import { useItemFilterStore } from '../store/filtersAndSortBy/itemFilter';
import ItemPageHeader from '../components/ItemsPage/ItemPageHeader';
import { useSelectedListStore } from '../UseCases/SelectedList/Store';
import { useExistingListsStore } from '../UseCases/ExistingLists/Store';

function ItemsPage() {
  const listID = useSelectedListStore((state) => state.selectedListID)
  const list = useExistingListsStore((state) => state.existingLists).get(listID)
  const itemFilter = useItemFilterStore((state) => state.itemFilter);

  const items = filterItems(itemFilter, list.itemsList).map(([itemID, item]) => (
    <ItemLine
      key={itemID}
      itemID={itemID}
      item={item}
    />
  ));

  return (
    <div className="flex flex-col w-full gap-1 px-10 text-info relative">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-base-100 via-[95%] pb-2">
        <div className="flex items-center justify-between pt-4">
          <ItemPageHeader />
        </div>

        <LastModifiedText />

        <div className="flex w-full mt-[0.12rem]">
          <NewItemForm />
        </div>

        <SearchItemInput />
      </div>

      <ul className="flex flex-col gap-3">{items}</ul>
    </div>
  );
}

export default ItemsPage;
