import React, { useState } from 'react'

const Player = ({ symbol, isActive }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('Player')

  return (
    <>
      <span>
        {isEditing ? (
          <input
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        ) : (
          <li className={isActive ? 'active' : ''}>
            <span className='player-name'>{name}</span>
            <span className='player-symbol'>{symbol}</span>
          </li>
        )}
      </span>
      <button onClick={() => setIsEditing((value) => !value)}>
        {isEditing ? 'Saved' : 'Edit'}
      </button>
    </>
  )
}

export default Player
