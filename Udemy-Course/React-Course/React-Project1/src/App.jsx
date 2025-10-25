import { useState } from 'react'
import GameBoard from './components/GameBoard/GameBoard'
import Player from './components/Plyer/Player'
import TurnsHistory from './components/TurnHistory/TurnsHistory'

function App() {
  const [turn, setTurn] = useState(0)
  const [logs, setLogs] = useState([])
  const [board, setBoard] = useState(Array(9).fill(null))

  const handleClick = (index) => {
    if (board[index] !== null) return console.log('Already clicked')
    const newBoard = [...board]
    newBoard[index] = turn === 0 ? 'X' : 'O'
    setBoard(newBoard)

    setTurn(turn === 0 ? 1 : 0)
    setLogs(() =>{
      const newLogs = [...logs]
      newLogs.push(`${turn === 0 ? 'X' : 'O'} clicked on ${index}`)
      return newLogs
    })
  }

    const calculateWinner = (board) => {
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
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a]
      }
    }
    return null
  }

  const winner = calculateWinner(board)
  let status

  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (turn === 0 ? 'x' : 'o')
  }
  return (
    <div>
      <header>
        <img src='../../game-logo.png' alt='' />
        <h1>Tic-Tac-Toe</h1>
        <h2>{status}</h2>
      </header>
      <main>
        <div id='game-container'>
          <ul id='players' className='highlight-player'>
            <Player symbol='X' isActive={turn === 0} />
            <Player symbol='O' isActive={turn === 1} />
          </ul>
          <GameBoard board={board} setBoard={handleClick} />
        </div>
        <TurnsHistory logs = {logs}/>
      </main>
    </div>
  )
}

export default App
