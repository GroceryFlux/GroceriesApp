import React from 'react';
import PropTypes from 'prop-types';

function ListOverview({ setIsModalVisible, listOverview, setSelectedIndex }) {
  return (
    <>
      <div className="flex w-full justify-end pt-5 pr-5">
        <button
          className="text-5xl"
          onClick={() => {
            setIsModalVisible(true)
            setSelectedIndex(undefined)
          }}
        >
          +
        </button>
      </div>
      <div className="flex flex-col pl-5">
        <h1>Existing lists</h1>
        <ul>
          {listOverview.lists.map((list, index) => (
            <li key={`key${index}`}>
              {console.log('index', index)}
              <button onClick={() => {setIsModalVisible(true); setSelectedIndex(index)}}>{list.title}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

ListOverview.propTypes = {
  setIsModalVisible: PropTypes.func,
  listOverview: PropTypes.object,
  setSelectedIndex: PropTypes.func
};

export default ListOverview;
