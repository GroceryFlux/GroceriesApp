import React from 'react';
import { filterLists } from '../utils/filterValue.utils';
import { sortBy } from '../utils/timeStampAndSortBy';
import { useListsStore } from '../store/lists/lists';
import NewListButton from '../components/ListsPage/NewListButton';
import SelectSortBy from '../components/ListsPage/SelectSortBy';
import ListsPageHeader from '../components/ListsPage/ListsDisplayHeader';
import { useListFilterStore } from '../store/filtersAndSortBy/listFilter';
import { useSortByStore } from '../store/filtersAndSortBy/sortBy';
import ListLine from '../components/ListsPage/ListLine/ListLine';
import SearchListInput from '../components/ListsPage/SearchListInput';

function ListsPage() {
  const existingLists = useListsStore((state) => state.existingLists);
  const listFilter = useListFilterStore((state) => state.listFilter);
  const sortType = useSortByStore((state) => state.sortType);

  const lists = filterLists(listFilter, sortBy(sortType, existingLists)).map(([listID, list]) => (
    <ListLine
      key={listID}
      listID={listID}
      list={list}
    />
  ));

  return (
    <div className="w-[80%] min-w-[200px]">
      <ListsPageHeader />
      <div className="flex gap-4 my-4">
        <div className="text-lg">Recurrent lists</div>
        <NewListButton />
      </div>
      <div className="flex gap-3 mb-4 shrink-0">
        <SearchListInput />
        <SelectSortBy />
      </div>
      <div className="">
        <ul>{lists}</ul>
      </div>
    </div>
  );
}

export default ListsPage;
