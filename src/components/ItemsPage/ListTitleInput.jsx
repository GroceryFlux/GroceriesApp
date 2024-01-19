import React from 'react';
import { newItemFormId } from './NewItemForm.jsx';
import { useSelectedListStore } from '../../UseCases/SelectedList/Store.js';
import { getList, saveList } from '../../UseCases/ExistingLists/Repository.js';

function focusNextInput(event) {
  event.preventDefault();

  document.getElementById(newItemFormId).focus();
}

function ListTitleInput() {
  const listID = useSelectedListStore((state) => state.selectedListID);
  const list = getList(listID);

  return (
    <>
      <form
        onSubmit={focusNextInput}
        className="shrink max-w-[60%]"
      >
        <input
          placeholder="Title"
          defaultValue={list.title}
          className="h-[40px] w-full text-center text-ellipsis text-4xl rounded-md focus:outline focus:outline-blue-500/50 font-medium bg-inherit placeholder:info-content placeholder:italic"
          onBlur={(event) => {
            list.title = event.target.value;
            list.timeStamp = Date.now();
            saveList({ listID, list });
          }}
        />
      </form>
    </>
  );
}

export default ListTitleInput;
