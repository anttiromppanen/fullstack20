import React from 'react';

const Filter = ({ filterValue, setFilterValue }) => {
  const handleChange = (e) => setFilterValue(e.target.value)

  return (
    <div>
      <label htmlFor="filter">Filter shown with </label>
      <input id="filter" name="filter" value={ filterValue } onChange={ handleChange }  />
    </div>
  );
};

export default Filter;