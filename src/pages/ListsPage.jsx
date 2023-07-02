import React from 'react';
import { filterLists } from '../utils/filterValue.utils';
import { sortBy } from '../utils/timeStampAndSortBy';
import { useListsStore } from '../store/lists/lists';
import NewListButton from '../components/ListsPage/NewListButton';
import ListsPageHeader from '../components/ListsPage/ListsDisplayHeader';
import { useListFilterStore } from '../store/filtersAndSortBy/listFilter';
import { useSortByStore } from '../store/filtersAndSortBy/sortBy';
import ListLine from '../components/ListsPage/ListLine/ListLine';
import SearchListInput from '../components/ListsPage/SearchListInput';
import SelectSorting from '../components/ListsPage/SelectSorting';

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
    <div className="flex flex-col w-full gap-8 px-10">
      <div className="flex items-center justify-between gap-8 pt-4">
        <ListsPageHeader />
      </div>

      <div className="flex justify-between flex-wrap">
        <div className="text-2xl">Recurrent lists</div>
        <div className="flex gap-4">
          <NewListButton />
          <SelectSorting />
          <SearchListInput />
        </div>
      </div>
      <ul className="flex flex-col">
        {lists}
        <div className="divider mt-1 mb-1" />
      </ul>
    </div>
  );
}

export default ListsPage;
