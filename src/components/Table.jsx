import React from 'react'

import TableRow from './TableRow';


const Table = ({dogData,  onRowClick}) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Age</th>
          <th>Cat-safe</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        {dogData.map((dog) => <TableRow key={dog.id} dog={dog} onRowClick={onRowClick}/>)}
      </tbody>
    </table>
  )
}

export default Table