import React from 'react'
import { useState, useEffect } from 'react'
import './header.css'

const Header = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='header'>
      <div className='header-logo'>
        <img
          src='*'
          alt='PsyTurbo'
        />
        <h1>PsyTurbo</h1>
      </div>
      <ul className='header-navigation'>
        <li>
          <a href='#'>Main Page</a>
        </li>
        <li>
          <a href='#'>Booking</a>
        </li>
        <li>
          <a href='#'>Contact us</a>
        </li>
      </ul>

      <div className='header-icons'>
             <p>Account<span>Icon</span></p>
             <p>{time}</p>
      </div>
    </div>
  )
}

export default Header;
