import React from 'react'

import Part from './Part'

const Content = ({ parts }) => {
  const partsMapped = parts.map(part => <Part key={ part.id } name={ part.name } exercises={ part.exercises } />)
  
  return (
    <div>
      <ul>
        { partsMapped }
      </ul>
    </div>
  )
}

export default Content