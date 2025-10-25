import { useState } from 'react'
import React from 'react'

const GameBoard = ({ board, setBoard}) => {
//   const [board, setBoard] = useState(Array(9).fill(null))

//   const handleClick = (index) => {
//     if (board[index] !== null) return console.log('Already clicked')
//     const newBoard = [...board]
//     newBoard[index] = turn === 0 ? 'X' : 'O'
//     setBoard(newBoard)

//     setTurn(turn === 0 ? 1 : 0)
//   }

  return (
    <div id='game-board'>
      <ol>
        {board.map((element, index) => {
          return (
            <li key={index}>
              <button onClick={() => setBoard(index)}>{element}</button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default GameBoard
