import React from 'react'
import './componentsStyles/NewsLetterBox.css'

const NewsLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='news-letter-container'>
      <p>Subscribe now and get 10% discount on your first order. </p>
      <form onSubmit={handleSubmit} action=''>
        <input type='email' placeholder='Enter your email' required />
        <button type='submit'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
