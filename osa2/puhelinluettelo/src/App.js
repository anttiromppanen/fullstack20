import React, { useState } from 'react'

import Inputs from './components/Inputs'
import ShowPersons from './components/ShowPersons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const onkoJoLisatty = persons
    .find(person => person.name.toLowerCase() === newName.toLowerCase())

  const nameValue = (e) => {
    setNewName(e.target.value)
  }

  const numberValue = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const lisattava = {
      name: newName,
      number: newNumber
    }

    // Tyhjennetään inputit
    setNewName('')
    setNewNumber('')
    if (onkoJoLisatty) {
      return alert(`${ newName } is already added to phonebook`)
    }

    setPersons(persons.concat(lisattava))
}


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={ persons } filterValue={ filterValue } setFilterValue={ setFilterValue } />
      <Inputs
        handleSubmit={ handleSubmit }
        handleNameChange={ nameValue }
        handleNumberChange={ numberValue }
        newName={ newName }
        newNumber={ newNumber }
      />
      <ShowPersons persons={ persons } filterValue={ filterValue } />
    </div>
)

}

export default App