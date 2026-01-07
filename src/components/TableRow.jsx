import React from 'react';

import { getAgeInYears } from '../helpers';
const TableRow = ({ dog, isSelected, onRowClick }) => {
  const shortCatText =
    dog.cats === 'unknown' ? '?' : dog.cats === 'no' ? 'N' : 'Y';

  const longCatText =
    dog.cats === 'unknown'
      ? 'Unknown'
      : dog.cats === 'no'
      ? 'No cats'
      : 'Cats OK';

  const shortStatusText =
    dog.status === 'adoption pending'
      ? 'Pending'
      : dog.status === 'adopted' || dog.status === 'injured reserve'
      ? 'Unavail'
      : 'Avail';

  const longStatusText =
    dog.status === 'adoption pending'
      ? 'Adoption pending'
      : dog.status === 'adopted' || dog.status === 'injured reserve'
      ? 'Unavailable'
      : 'Available';

  return (
    <tr
      className={isSelected ? 'selected' : ''}
      onClick={() => onRowClick(dog)}
    >
      <td>{dog.name}</td>
      <td>{dog.sex[0].toUpperCase()}</td>
      <td>{getAgeInYears(dog.whelped)}yrs</td>
      <td
        className='cat-cell'
        data-short-text={shortCatText}
        data-long-text={longCatText}
      ></td>
      <td
        className='status-cell'
        data-short-text={shortStatusText}
        data-long-text={longStatusText}
      ></td>
    </tr>
  );
};

export default TableRow;
