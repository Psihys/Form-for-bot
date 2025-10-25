import React from 'react'

const TurnsHistory = ({ logs }) => {
  return (
    <ol id='log'>
      {logs.map((log, index) => {
        return <li key={index}>{log}</li>
      })}
    </ol>
  )
}

export default TurnsHistory
