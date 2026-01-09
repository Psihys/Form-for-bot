import React from 'react'
import { NavLink } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'

import { FaMoon } from 'react-icons/fa'
import { CiSun } from 'react-icons/ci'

const NavBar = ({ theme, handleTheme }) => {
  const { logout, authUser } = useAuthStore()

  return (
    <header className='header'>
      <div className='nav-bar'>
        <div className='nav-bar__logo'>
          <img src='/logo.png' alt='logo' />
        </div>
        <div className='nav-bar__links'>
          {!authUser && (
            <>
              <NavLink to='/signup'>Sign Up</NavLink>
              <NavLink to='/login'>Login</NavLink>
            </>
          )}

          {authUser && (
            <>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/settings'>Settings</NavLink>
              <NavLink to='/profile'>Profile</NavLink>
              <button onClick={logout} className='nav-bar__logout-btn'>
                Logout
              </button>
            </>
          )}
        </div>
        <div className='nav-bar__theme-switcher'>
          <button
            className='swithc-button'
            type='button'
            onClick={() => handleTheme()}
          >
            {theme === 'light' ? <CiSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
