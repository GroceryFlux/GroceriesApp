import React from 'react';
import { filterLists }from '../utils/filterValue.utils';
import { sortBy } from '../utils/timeStampAndSortBy';
import { useListsStore } from '../store/lists/lists';
import NewListButton from '../components/ListsPage/NewListButton';
import SelectSortBy from '../components/ListsPage/SelectSortBy';
import ListsPageHeader from '../components/ListsPage/ListsDisplayHeader';
import { useFilterStore } from '../store/filtersAndSortBy/filters';
import { useSortByStore } from '../store/filtersAndSortBy/sortBy';
import ListLine from '../components/ListsPage/ListLine';
import SearchListInput from '../components/ListsPage/SearchListInput';


function ListsPage() {

  const existingLists = useListsStore((state) => state.existingLists)
  const listFilter = useFilterStore((state) => state.listFilter)
  const sortType = useSortByStore((state) => state.sortType)

  return (
    <div className="w-3/4">
      <ListsPageHeader />
      <div className="flex gap-4 my-4">
        <div className="text-lg">
          Recurrent lists
        </div>
        <NewListButton />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-3 mb-4">
          <SearchListInput />
          <SelectSortBy />
        </div>
        <div className="">
          <ul>
            {filterLists(listFilter, sortBy(sortType, existingLists)).map(([listID, list]) => (
              <ListLine
                key={listID}
                listID={listID}
                list={list}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListsPage;
