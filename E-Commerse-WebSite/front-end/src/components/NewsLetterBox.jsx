import React from 'react'
import './componentsStyles/NewsLetterBox.css'

const NewsLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='news-letter__container'>
      <h2>
        Subscribe now and get 10% off.
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
      </p>
      <form className='news-letter__form' onSubmit={handleSubmit} action=''>
        <input type='email' placeholder='Enter your email' required />
        <button type='submit'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
