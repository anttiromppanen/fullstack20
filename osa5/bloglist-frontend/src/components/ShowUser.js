import React from 'react';

const ShowUser = ({ user }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload(true)
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <p>
        { user.name } logged in
        <button type="submit" onClick={ () => handleLogout() }>logout</button>
      </p>
    </div>
  );
};

export default ShowUser;