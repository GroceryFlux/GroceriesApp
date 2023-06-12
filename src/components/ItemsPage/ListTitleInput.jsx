import React, { useState } from 'react';
import { useListsStore } from '../../store/lists/lists';
import { useThemeStore } from '../../store/theme/theme';

function ListTitleInput() {
  const theme = useThemeStore((state) => state.theme);
  const listID = useListsStore((state) => state.selectedListID);
  const list = useListsStore((state) => state.existingLists).get(listID);
  const saveExistingLists = useListsStore((state) => state.saveExistingLists);
  
  const [localTitle, setLocalTitle] = useState(list.title)

  return (
    <input
      placeholder="Add a title"
      defaultValue={list.title}
      className={`border-solid border-2 text-center focus: outline-none placeholder:italic text-2xl rounded-lg 
        ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}
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
