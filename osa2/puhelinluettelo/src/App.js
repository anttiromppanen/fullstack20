import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Inputs from './components/Inputs'
import ShowPersons from './components/ShowPersons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  // Data tiedostosta db.json
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const onkoJoLisatty = persons
    .find(person => person.name.toLowerCase() === newName.toLowerCase())

  // Nimi inputin value
  const nameValue = (e) => {
    setNewName(e.target.value)
  }

  // Number inputin value
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