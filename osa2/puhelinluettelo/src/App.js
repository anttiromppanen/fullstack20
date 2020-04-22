import React, { useState, useEffect } from 'react'

import personService from './services/persons'

import Inputs from './components/Inputs'
import ShowPersons from './components/ShowPersons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ message, setMessage ] = useState('')

  // Data tiedostosta db.json
  useEffect(() => {
    personService
      .getAll()
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personId = persons
          .find(person => person.name.toLowerCase() === newName.toLowerCase())

        personService
          .updatePerson(personId.id, lisattava)
          .then(res => {
            setPersons(persons.map(person => person.id !== res.data.id ? person : lisattava))
            setMessage(`Successfully updated number for ${res.data.name}`)
          })
          .catch(error => {
            setMessage(`Information of ${ personId.name } has already been removed from server`)
            setPersons(persons.filter(person => person.id !== personId.id))
          })
      }

      // Ilman returnia sama henkilö lisätään kahdesti
      return
    }

    // Lisätään "tietokantaan"
    personService
      .create(lisattava)
      .then(res => {
        setPersons(persons.concat(res.data))
        setMessage(`${res.data.name} successfully added to phonebook`)
      })
      .catch(error => setMessage(error.response.data.error))
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`))

    personService
      .deletePerson(id)
      .then(res => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`Deleted ${name} successfully from phonebook`)
      })
      .catch(res => {
        setMessage(`${name} has been already deleted from phonebook`)
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={ message } setMessage={ setMessage } />
      <Filter persons={ persons } filterValue={ filterValue } setFilterValue={ setFilterValue } />
      <Inputs
        handleSubmit={ handleSubmit }
        handleNameChange={ nameValue }
        handleNumberChange={ numberValue }
        newName={ newName }
        newNumber={ newNumber }
      />
      <ShowPersons persons={ persons } filterValue={ filterValue } handleDelete={ handleDelete } />
    </div>
  )
}

export default App