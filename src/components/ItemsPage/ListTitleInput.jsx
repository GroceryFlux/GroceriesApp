import React from 'react';
import { useListsStore } from '../../store/lists/lists';

function hasTitle(list) {
  return list.title !== '';
}

function ListTitleInput() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);

  return (
    <input
      placeholder="Title"
      defaultValue={list.title}
      className="grow shrink text-center text-ellipsis text-4xl rounded-md focus:outline focus:outline-blue-500/50 font-medium bg-inherit max-w-[60%] placeholder:text-slate-700/80 placeholder:italic"
      autoFocus={!hasTitle(list)}
      onBlur={(event) => {
        list.title = event.target.value;
        list.timeStamp = Date.now();
        saveExistingLists(listID, list);
      }}
    />
  );
}

export default ListTitleInput;
