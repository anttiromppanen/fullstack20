import React from 'react';

const Message = ({ message, setMessage }) => {
  message &&
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  return (
    <div>
      { message }
    </div>
  )
};

export default Message;