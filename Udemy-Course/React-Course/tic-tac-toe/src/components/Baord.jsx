import React, { useState } from 'react'
import './board.css'
import Square from './Square'

const Baord = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const board = Array(9).fill(null)

  const handleClick = (i) => {
    const newSquares = [...squares] // the same as squares.slice() also return a new Array
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    if (xIsNext) {
      newSquares[i] = 'x'
    } else {
      newSquares[i] = 'o'
    }
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(squares)
  let status

  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'x' : 'o')
  }

  const handleReset = () => {
    setSquares(Array(9).fill(null))
  }

  return (
    <div className='board-container'>
      <h1>Tic Tac Toe</h1>
      <h2>{status}</h2>
      <div className='board-temp'>
        {board.map((_, i) => (
          <Square
            onSquareClick={() => handleClick(i)}
            value={squares[i]}
            key={i}
          />
        ))}
      </div>
      <button onClick={() => handleReset()}>Reset</button>
    </div>
  )
}

export default Baord
