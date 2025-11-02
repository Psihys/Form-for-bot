import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { NavLink, Link } from 'react-router-dom'
import './componentsStyles/NavBar.css'

const NavBar = () => {
  return (
    <div className='navigation-container'>
      <NavLink className='logo' to='/'>
        {' '}
        <img src={assets.logo} alt='' />
      </NavLink>

      <ul className='navigation-list'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/collection'>Collection</NavLink>
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
        <li>
          <NavLink to='/contact'>Contact</NavLink>
        </li>
      </ul>

      <ul className='navigation-icons'>
        <img src={assets.search_icon} alt='' />

        <div className='profile-menu'>
          <img src={assets.profile_icon} alt='' />

          <ul className='dropdown'>
            <li>
              <Link to='/profile'>My Account</Link>
            </li>
            <li>
              <Link to='/orders'>Orders</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        </div>
        <Link to='/cart'>
          <img src={assets.cart_icon} alt='' />
          <p></p>
        </Link>
      </ul>
    </div>
  )
}

export default NavBar
