import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'

import { FaRegUserCircle } from 'react-icons/fa'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaCartPlus } from 'react-icons/fa'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import Cart from './pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <header className='header'>
        <a href='/'>
          <img src='./' alt='Logo' className='logo' />
        </a>

        <nav className='navigation'>
          <Link to='/'>Home</Link>
          <Link to='/Products'>Products</Link>
          <Link to='/Cart'>Cart</Link>
        </nav>

        <ul className='icons'>
          <li>
            <Link to='/profile'>
              <FaRegUserCircle />
            </Link>
          </li>
          <li>
            <Link to='tel:+380XXXXXXXXX'>
              <FaPhoneAlt />
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <FaCartPlus />
            </Link>
          </li>
        </ul>
      </header>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Products' element={<ProductsPage />} />
        <Route path='/Cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
