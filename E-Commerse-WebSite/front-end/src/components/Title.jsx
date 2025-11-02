import React from 'react'
import './componentsStyles/Title.css'

const Title = ({ title, subtitle, description }) => {
  return (
    <div className='title-container'>
      <h2>
        {title} <span>{subtitle}</span>
      </h2>
      <p> {description}</p>
    </div>
  )
}

export default Title
