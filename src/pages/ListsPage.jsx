import React from 'react';
import { filterLists } from '../utils/filterValue.utils';
import { sortBy } from '../utils/timeStampAndSortBy';
import NewListButton from '../components/ListsPage/NewListButton';
import ListsPageHeader from '../components/ListsPage/ListsPageHeader';
import { useListFilterStore } from '../store/filtersAndSortBy/listFilter';
import { useSortByStore } from '../store/filtersAndSortBy/sortBy';
import ListLine from '../components/ListsPage/ListLine/ListLine';
import SearchListInput from '../components/ListsPage/SearchListInput';
import SelectSorting from '../components/ListsPage/SelectSorting';
import SearchListButton from '../components/ListsPage/SearchListButton';
import { useExistingListsStore } from '../UseCases/ExistingLists/Store';

function ListsPage() {
  const existingLists = useExistingListsStore((state) => state.existingLists)
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
    <div className="flex flex-col w-full gap-8 px-10 text-info">
      <div className="flex items-center justify-between gap-8 pt-4">
        <ListsPageHeader />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between flex-wrap">
          <div className="text-2xl">Recurrent lists</div>
          <div className="flex gap-4">
            <NewListButton />
            <SelectSorting />
            <SearchListButton />
          </div>
        </div>

        <SearchListInput />

        <ul className="flex flex-col">
          <div className="divider mt-0 mb-1" />
          {lists}
        </ul>
      </div>
    </div>
  );
}

export default ListsPage;
