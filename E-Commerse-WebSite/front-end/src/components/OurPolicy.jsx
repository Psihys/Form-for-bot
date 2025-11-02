import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import './componentsStyles/OurPolicy.css'

const OurPolicy = () => {
  return (
    <div className='policy-container'>
      <div>
        <img src={assets.exchange_icon} alt='Exchange Policy' />
        <h4>Exchange Policy</h4>
        <p>
          We offer a 30-day return policy for all our products.
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} alt='Quality Policy' />
        <h4>Quality Policy</h4>
        <p>
          We provide high-quality products at competitive prices. If you find any
        </p>
      </div>
      <div>
        <img src={assets.support_img} alt='Support Policy' />
        <h4>Support Policy</h4>
        <p>
          We provide 24/7 customer support. Please contact us for any questions or
        </p>
      </div>
    </div>
  )
}

export default OurPolicy
