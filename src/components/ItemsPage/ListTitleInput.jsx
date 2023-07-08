import React, { useState } from 'react';
import { useListsStore } from '../../store/lists/lists';

function ListTitleInput() {
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);

  const [localTitle, setLocalTitle] = useState(list.title);

  return (
    <input
      placeholder="Add a title"
      defaultValue={list.title}
      className={`border border-solid border-accent text-center focus:outline-none placeholder:italic text-2xl rounded-2xl bg-neutral
        ${localTitle === '' ? 'border-red-400' : null}
      `}
      onBlur={(event) => {
        list.title = event.target.value;
        list.timeStamp = Date.now();
        saveExistingLists(listID, list);
      }}
      onChange={(event) => setLocalTitle(event.target.value)}
    />
  );
}

export default ListTitleInput;
