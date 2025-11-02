import React from 'react'
import { NavLink } from 'react-router-dom'
import './componentsStyles/Footer.css'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-top'>
        <div className='footer-brand'>
          <NavLink className='logo' to='/'>
            {' '}
            <img src={assets.logo} alt='' />
          </NavLink>
        </div>
        <div className='footer-links'>
          <h3>Quick Links</h3>
          <ul>
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
        </div>
        <div className='footer-contact'>
          <h3>Contact</h3>
          <p>Email: support@shopmate.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} ShopMate. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
