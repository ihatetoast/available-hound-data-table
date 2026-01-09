import React from 'react'

const SelectFilter = ({labelText, topic, options, onFilterChange}) => {

  function handleFilterChange(e){
    onFilterChange(e.target.value);
  }

  return (
    <div className={`select-filter ${topic}`}>
          <label htmlFor={`${topic}-select`}>{labelText}</label>
          <select id={`${topic}-select`} className={`select ${topic}`} name={topic} onChange={handleFilterChange}>
            {options.map((opt, idx) => <option key={idx} value={opt.value}>{opt.text}</option>)}
          </select>
        </div>
  )
}

export default SelectFilter;