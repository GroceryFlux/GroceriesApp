import React from 'react';
import PropTypes from 'prop-types';
import OpenListButton from './OpenListButton';
import DeleteListButton from './DeleteListButton';

function ListLine({ listID, list }) {
  return (
    <li className="">
      <div className="flex justify-between">
        <OpenListButton
          listID={listID}
          title={list.title}
        />
        <DeleteListButton listID={listID} />
      </div>
    </li>
  );
}

ListLine.propTypes = {
  listID: PropTypes.string,
  list: PropTypes.object,
};

export default ListLine;
