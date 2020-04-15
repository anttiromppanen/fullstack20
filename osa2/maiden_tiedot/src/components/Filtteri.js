import React from 'react';

const Filtteri = ({ filtteriValue, setFiltteriValue }) => {
  const handleChange = (e) => {
    setFiltteriValue(e.target.value)
  }

  return (
    <div>
      <label htmlFor="filtteri">find countries </label>
      <input id="filtteri" name="filtteri" value={ filtteriValue } onChange={ handleChange } />
    </div>
  );
};

export default Filtteri;