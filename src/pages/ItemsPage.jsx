import React from 'react';
import { filterItems } from '../utils/filterValue.utils';
import { useSelectedListStore } from '../store/selectedList/selectedList';
import { useListsStore } from '../store/lists/lists';
import ReturnButton from '../components/sharedComponents/ReturnButton';
import ListTitleInput from '../components/ItemsPage/ListTitleInput';
import LastModifiedText from '../components/ItemsPage/LastModifiedText';
import NewItemForm from '../components/ItemsPage/NewItemForm';
import { useFilterStore } from '../store/filtersAndSortBy/filters';
import ItemLine from '../components/ItemsPage/ItemLine';
import SearchItemInput from '../components/ItemsPage/SearchItemInput';

function ItemsPage() {

  const listID = useSelectedListStore((state) => state.selectedList)
  const list = useListsStore((state) => state.existingLists).get(listID)
  const itemFilter = useFilterStore((state) => state.itemFilter)


  return (
    <>
      <div className="flex justify-between px-3 pt-5 mb-5">
        <ReturnButton />
        <ListTitleInput />
        <div className="min-w-[5rem]"/>
      </div>
      <LastModifiedText />
      <NewItemForm />
      <div className="flex justify-center">
        <SearchItemInput />
      </div>
      <div className="mx-5 py-3">
        <ul>
          {filterItems(itemFilter, list.itemsList).map(([itemID, item]) => (
            <ItemLine 
              key={itemID}
              itemID={itemID}
              item={item}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default ItemsPage;
