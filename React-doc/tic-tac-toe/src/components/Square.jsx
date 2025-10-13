import { useState } from 'react'
import React from 'react'
import './Square.css'

const Square = ({ value, onSquareClick  }) => {

  return (
    <button onClick={onSquareClick } className='square'>
      {value}
    </button>
  )
}

export default Square
