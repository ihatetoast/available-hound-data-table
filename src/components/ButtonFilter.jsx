import Button from './Button'
const ButtonFilter = ({options, className, onOptionClick }) => {

  const filtered = options.filter(opt => opt.value !== '');
  return (
    <div className="button-filter">
      {filtered.map((opt, idx) => <Button key={opt.value || idx} className={className || ""} onClick={()=>onOptionClick(opt.value)}>{opt.text}</Button>)}
    </div>
  )
}

export default ButtonFilter