import React from 'react'

const Message = ({children}) => {
  return (
    <div className='message-container'>
      {children}
    </div>
  )
}

export default Message