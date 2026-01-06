import React from 'react'

const TableRow = ({dog, onRowClick}) => {
  return (
    <tr onClick={() => onRowClick(dog)}>
      <td>{dog.name}</td>
      <td>{dog.sex}</td>
      <td>CALC AGE</td>
      <td>{dog.cats}</td>
      <td>{dog.status}</td>
    </tr>
  )
}

export default TableRow