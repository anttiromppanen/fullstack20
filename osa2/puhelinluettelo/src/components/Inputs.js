import React from 'react'

const Inputs = ({ handleSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return (
    <div>
      <h3>Add a new</h3>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="name">Name</label><br />
          <input id="name" name="name" value={ newName } onChange={ handleNameChange } />
        </div>
        <div>
          <label htmlFor="number">Number</label><br />
          <input id="number" name="number" value={ newNumber } onChange={ handleNumberChange } />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Inputs