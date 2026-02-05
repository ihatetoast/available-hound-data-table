const SelectFilter = ({labelText, topic, options, onFilterChange}) => {
  return (
    <div className={`select-filter ${topic}`}>
          <label htmlFor={`${topic}-select`}>{labelText}</label>
          <select id={`${topic}-select`} className={`select ${topic}`}  name={topic} onChange={(e) =>onFilterChange(e.target.value)}>
            {options.map((opt, idx) => <option key={opt.value || idx} value={opt.value}>{opt.text}</option>)}
          </select>
        </div>
  )
}

export default SelectFilter;