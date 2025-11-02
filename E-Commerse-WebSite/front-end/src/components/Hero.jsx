import React from 'react'
import './componentsStyles/Hero.css'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='hero-container'>
      <div className='hero-left'>
        <p>OUR BESTSELLERS</p>
        <h1>Latest Arrivals</h1>
        <p>SHOP NN</p>
      </div>
      <div className='hero-right'>
        <img src={assets.hero_img} alt="Hero-image" />
      </div>
    </div>
  )
}

export default Hero
