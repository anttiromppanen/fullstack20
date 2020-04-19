import React from 'react';

const Notification = ({ message, setMessage }) => {
  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (!message) return null

  const selectCssClass = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    if (message.toLowerCase().includes('successfully')) {
      return success
    }

    return error
  }

  return (
    <div style={ selectCssClass() }>
      { message }
    </div>
  );
};

export default Notification;