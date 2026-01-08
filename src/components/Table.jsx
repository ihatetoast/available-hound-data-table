import React from 'react';

import TableRow from './TableRow';

const Table = ({ dogData, expandable, expandedDogId, selectedDog, onRowClick, onHeaderNameClick,onHeaderAgeClick }) => {
  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th onClick={() => onHeaderNameClick()}>Name</th>
            <th>Sex</th>
            <th onClick={() => onHeaderAgeClick()}>Age</th>
            <th>Cat-safe</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {dogData.map((dog, idx) => (
            <TableRow
              isSelected={selectedDog?.id === dog.id}
              key={dog.id}
              tabindex={idx}
              role="button"
              dog={dog}
              expandable={expandable}
              isExpanded={dog.id === expandedDogId}
              onRowClick={onRowClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
