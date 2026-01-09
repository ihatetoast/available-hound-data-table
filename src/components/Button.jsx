import React from 'react'

const Button = ({classes, disabled, children, onClick}) => {
  return (
    <button className={`main-btn ${classes}`} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default Button