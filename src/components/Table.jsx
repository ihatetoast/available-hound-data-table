import { useState } from 'react';

import TableRow from './TableRow';
import TableHeadButton from './TableHeadButton';

const Table = ({
  dogData,
  expandable,
  expandedDogId,
  selectedDog,
  onRowClick,
  onHeaderClick,
  sortConfig,
}) => {
  const [animatingCol, setAnimatingCol] = useState(null);



  function handleNameClick(col) {
    onHeaderClick(col);
    // start the anim for th, and state which one it is
    setAnimatingCol(col); // logs as expected
    setTimeout(() => {
      // time the anim ..
      setAnimatingCol(null);
    }, 800);
  }
console.log("in table / animatingCol ", animatingCol);
  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <TableHeadButton
              text='Name'
              animatedText={{ asc: 'A – Z', desc: 'Z – A' }}
              column='name'
              animatingCol={animatingCol}
              onHeadClick={handleNameClick}
              sortConfig={sortConfig}
            />
            <th>Sex</th>
            <TableHeadButton
              text='Age'
              animatedText={{ asc: '1 – 99', desc: '99 – 1' }}
              column='age'
              animatingCol={animatingCol}
              onHeadClick={handleNameClick}
              sortConfig={sortConfig}
            />
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
              role='button'
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
