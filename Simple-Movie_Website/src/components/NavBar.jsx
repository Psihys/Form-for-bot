import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='navbar'>
        <div className="navbar-brand">
            <Link to = '/'>Movie Home</Link>
        </div>
        <div className="navbar-links">
            <Link className='nav-link' to = '/'>Home</Link>
            <Link className='nav-link' to = '/favorites'>Favorites</Link>
        </div>
    </nav>
  )
}

export default NavBar