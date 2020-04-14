import React from 'react'

import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => {
  const coursesMapped = courses.map(course => {
    return (
      <div key={ course.id }>
        <Header name={ course.name } />
        <Content parts={ course.parts } />
        <Total parts={ course.parts } />
      </div>
    )
  })
  
  return (
    <div>
     { coursesMapped }
    </div>
  )
}

export default Course