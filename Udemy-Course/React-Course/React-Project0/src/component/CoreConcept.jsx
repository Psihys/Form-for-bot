import React from 'react'
import { CORE_CONCEPTS } from '../data'

const CoreConcept = () => {
  return (
    <div id='core-concepts'>
      <ul>
        {CORE_CONCEPTS.map((conceptItem, index) => (
          <li key={index}>
            <img src={conceptItem.image} alt={conceptItem.title} />
            <h3>{conceptItem.title}</h3>
            <p>{conceptItem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CoreConcept
