import React from 'react'

const TabButton = ({children, handleClick, isSelected}) => {

  
  return (
    <li>
        <button className={isSelected ? 'active' : ''} onClick={handleClick}>
            {children}
        </button>
    </li>
  )
}

export default TabButton