import React from 'react';

import Person from './Person'

const ShowPersons = ({ persons, filterValue }) => {
  const mapPersons = persons
    .filter(person => 
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    .map(
      person => 
        <Person
          key={ person.name }
          name={ person.name }
          number={ person.number }
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