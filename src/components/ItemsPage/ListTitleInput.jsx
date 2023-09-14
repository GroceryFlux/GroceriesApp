import React from 'react';
import { useListsStore } from '../../store/lists/lists';
import { newItemFormId } from './NewItemForm.jsx';

function hasTitle(list) {
  return list.title !== '';
}

function focusNextInput(event) {
  event.preventDefault();

  document.getElementById(newItemFormId).focus();
}

function ListTitleInput() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);

  return (
    <>
      <form
        onSubmit={focusNextInput}
        className="shrink max-w-[60%]"
      >
        <input
          placeholder="Title"
          defaultValue={list.title === 'No title' ? '' : list.title}
          className="h-[40px] w-full text-center text-ellipsis text-4xl rounded-md focus:outline focus:outline-blue-500/50 font-medium bg-inherit placeholder:info-content placeholder:italic"
          autoFocus={!hasTitle(list)}
          onBlur={(event) => {
            list.title = event.target.value;
            list.timeStamp = Date.now();
            saveExistingLists(listID, list);
          }}
        />
      </form>
    </>
  );
}

export default ListTitleInput;
