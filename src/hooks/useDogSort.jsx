import {useState,} from 'react'
import {  sortDogs } from '../helpers'
export function useDogSort( dogData){
   // can be sorted by name and age
  const [sortConfig, setSortConfig] = useState({
    column: null, // null/unsorted or 'age' or 'name
    direction: null, // null is unsorted asc or desc
  });

  const sortedData = sortDogs(dogData, sortConfig.column, sortConfig.direction);
    function handleHeaderClick(column) {
      // new dir: check first if you're clicking first after load or a diff col,
      // then check for existing direction
      const newDir = sortConfig.column !== column 
      ? 'asc' 
      : sortConfig.direction === 'asc' ? 'desc' : 'asc';
  
      setSortConfig({column, direction: newDir})
    }

  return {
    sortedData,
    sortConfig,
    handleHeaderClick
  }
}