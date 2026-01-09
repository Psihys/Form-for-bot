import React from 'react'
import { NavLink } from 'react-router'

const Header = ({ theme, toggleTheme }) => {
  return (
    <div className='header'>
      <div className='logo'>
        <img src='' alt='' />
      </div>

      <div className='nav-bar'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/create'>Create</NavLink>
      </div>

      <div className='theme-color'>
        <button onClick={() => toggleTheme()}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </div>
  )
}

export default Header
