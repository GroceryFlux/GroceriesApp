import React, { useState } from 'react';
import { filterLists } from '../../utils/filterValue.utils';
import { sortBy } from '../../utils/timeStampAndSortBy';
import { useSelectedListStore } from '../../store/selectedList/selectedList';
import { useListsStore } from '../../store/lists/lists';
import { useDisplayedMenuStore } from '../../store/displayedMenu/displayedMenu';
import ListsDisplayHeader from './ListsDisplayHeader';
import NewListButton from './NewListButton';
import SearchBar from '../sharedComponents/searchBar';
import SelectSortBy from './selectSortBy';
import DeleteButton from '../sharedComponents/deleteButton';
import ConfirmDeleteButton from './ConfirmDeleteButton';


function ListsDisplay() {
  const [filterValue, setFilterValue] = useState('');
  const [sortType, setSortType] = useState('')
  const [listToDelete, setListToDelete] = useState(null);

  const setSelectedList = useSelectedListStore((state) => state.setSelectedList)
  const existingLists = useListsStore((state) => state.existingLists)
  const deleteList = useListsStore((state) => state.deleteList)
  const setDisplayedMenu = useDisplayedMenuStore((state) => state.setDisplayedMenu)
  


  return (
    <div className="w-3/4">
      <ListsDisplayHeader 
        setDisplayedMenu={setDisplayedMenu}
      />
      <div className="flex gap-4 my-4">
        <div className="text-lg">
          Recurrent lists
        </div>
        <NewListButton />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-3 mb-4">
          <SearchBar 
            setFilterValue={setFilterValue}
          />
          <SelectSortBy 
            setSortType={setSortType}
          />
        </div>
        <div className="">
          <ul>
            {filterLists(filterValue, sortBy(sortType, existingLists)).map(([listID, list]) => (
              <li key={listID} className="mb-1">
                <div className="flex flex-row justify-between">
                  <button
                    onClick={() => {
                      setDisplayedMenu('itemsDisplay')
                      setSelectedList(listID);
                    }}
                  >
                    {list.title}
                  </button>
                  <div>
                    { listToDelete === listID ?
                      <ConfirmDeleteButton 
                        deleteList={deleteList}
                        setListToDelete={setListToDelete}
                        listID={listID}
                      />
                      :
                      <DeleteButton 
                        deleteFunction={setListToDelete}
                        deleteID={listID}
                      />
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListsDisplay;
