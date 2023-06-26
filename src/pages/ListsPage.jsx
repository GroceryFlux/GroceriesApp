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
    <div className="flex flex-col w-full gap-4 px-10">
      <div className="flex items-center justify-around gap-8 pt-4">
        <ListsPageHeader />
      </div>
      <div className="flex gap-2">
        <div className="text-lg">Recurrent lists</div>
        <NewListButton />
      </div>
      <div className="flex gap-3 h-7">
        <SelectSortBy />
        <SearchListInput />
      </div>
      <div className="">
        <ul className="flex flex-col gap-2">{lists}</ul>
      </div>
    </div>
  );
}

export default ListsPage;
