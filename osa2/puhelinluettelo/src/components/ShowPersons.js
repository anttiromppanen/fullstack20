import React from 'react';

import Person from './Person'

const ShowPersons = ({ persons, filterValue, handleDelete }) => {
  if (persons.length < 1) {
    return <div></div>  
  }

  const mapPersons = persons
    .filter(person => 
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    .map(
      person => 
        <Person
          key={ person.id }
          id={ person.id }
          name={ person.name }
          number={ person.number }
          handleDelete={ handleDelete }
        />
    )
  
  if (mapPersons.length < 1 && !filterValue) {
    return (
      <div>
        <h2>Numbers</h2>
        <p>Phonebook is empty</p>
      </div>
    )
  } else if (mapPersons.length < 1 && filterValue) {
    return (
      <div>
        <h2>Numbers</h2>
        <p>found no matches</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Numbers</h2>
      { mapPersons }
    </div>
  );
};

export default ShowPersons;