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



  function handleHeaderClick(col) {
    onHeaderClick(col);
    setAnimatingCol(col); 
    setTimeout(() => {
      // time the anim ..
      setAnimatingCol(null);
    }, 800);
  }

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
              onHeadClick={handleHeaderClick}
              sortConfig={sortConfig}
            />
            <th className="table-head" scope="col">Sex</th>
            <TableHeadButton
              text='Age'
              animatedText={{ asc: '1 – 99', desc: '99 – 1' }}
              column='age'
              animatingCol={animatingCol}
              onHeadClick={handleHeaderClick}
              sortConfig={sortConfig}
            />
            <th className="table-head" scope="col">Cat-safe</th>
            <th className="table-head" scope="col">status</th>
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
