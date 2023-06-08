import React from 'react';
import PropTypes from 'prop-types';
import { useThemeStore } from '../../../store/theme/theme';
import { useListsStore } from '../../../store/lists/lists';

function ModifyItemInput({ itemID, item }) {
  const theme = useThemeStore((state) => state.theme);
  const listID = useListsStore((state) => state.selectedListID);
  const saveItemName = useListsStore((state) => state.saveItemName);

  return (
    <div className="flex flex-row">
      <input
        className={`${theme === 'dark' ? 'bg-slate-700 text-slate-200' : ''}`}
        onBlur={(event) => saveItemName(event.target.value, itemID, listID)}
        defaultValue={item.itemName}
      />
    </div>
  );
}

ModifyItemInput.propTypes = {
  itemID: PropTypes.string,
  item: PropTypes.object,
};

export default ModifyItemInput;
