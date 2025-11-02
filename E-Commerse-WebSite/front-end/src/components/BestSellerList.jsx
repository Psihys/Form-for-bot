import React from 'react'
import ProductItem from './ProductItem'
import './componentsStyles/BestSellerList.css'

const BestSellerList = ({ bestSeller, currency }) => {
  return (
    <div className='bestseller-list'>
      <ProductItem products={bestSeller} currency={currency} />
    </div>
  )
}

export default BestSellerList
