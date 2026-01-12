const Button = ({className, disabled, children, onClick}) => {
  return (
    <button className={`main-btn ${className || ''}`} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default Button