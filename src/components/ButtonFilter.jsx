import React from 'react'
import Button from './Button'
const ButtonFilter = ({options, classes, onOptionClick }) => {
  console.log(options);

  function handleFilterBtnClick(value){
    onOptionClick(value)
  }
  const filtered = options.filter(opt => opt.value !== '');
  return (
    <div className="button-filter">
      {filtered.map((opt, idx) => <Button key={idx} classes={classes} onClick={()=>handleFilterBtnClick(opt.value)}>{opt.text}</Button>)}
    </div>
  )
}

export default ButtonFilter