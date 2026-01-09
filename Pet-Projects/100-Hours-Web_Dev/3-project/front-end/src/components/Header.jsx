import React from 'react'
import { NavLink } from 'react-router'

import './styles/header.css'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-navigation'>
        <NavLink to='/'>NoteBook</NavLink>
        <NavLink to='/create'>Create</NavLink>
      </div>
    </header>
  )
}

export default Header
