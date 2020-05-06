import React from 'react';

const Loginform = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h3>log in to application</h3>
      <form onSubmit={ handleLogin }>
      <div>
        username  
        <input
          type="text"
          value={ username }
          name="Username"
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
        password 
        <input
          type="password"
          value={ password }
          name="Password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  );
};

export default Loginform;