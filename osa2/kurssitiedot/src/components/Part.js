import React from 'react'

const Part = ({ name, exercises }) => {
  return (
    <li>
      { name } { exercises }
    </li>
  )
}

export default Part