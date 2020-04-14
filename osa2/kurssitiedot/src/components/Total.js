import React from 'react'

const Total = ({ parts }) => {
  const numOfParts = parts.reduce((acc, currValue) => {
    return acc + currValue.exercises
  }, 0)
  
  return (
    <h4>
      Total of { numOfParts } exercises
    </h4>
  )
}

export default Total