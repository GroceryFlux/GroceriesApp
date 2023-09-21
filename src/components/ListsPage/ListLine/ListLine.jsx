import React from 'react';
import PropTypes from 'prop-types';
import OpenListButton from './OpenListButton';
import DeleteListButton from './DeleteListButton';

function ListLine({ listID, list }) {
  return (
    <>
      <li className="">
        <div className="flex justify-between gap-3">
          <OpenListButton
            listID={listID}
            list={list}
          />
          <DeleteListButton listID={listID} />
        </div>
      </li>
      <div className="divider mt-1 mb-1" />
    </>
  );
}

ListLine.propTypes = {
  listID: PropTypes.string,
  list: PropTypes.object,
};

export default ListLine;
