import React from 'react'
import Title from './Title'
import BestSellerList from './BestSellerList'
import { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import './componentsStyles/BestSeller.css'

const BestSeller = () => {
  const { products, currency } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((product) => {
      return product.bestseller === true
    })
    setBestSeller(bestProduct.slice(0, 4))
  }, [])
  return (
    <div className='bestseller-container'>
      <Title
        title={'Best'}
        subtitle={'Seller'}
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'
        }
      />
      <BestSellerList bestSeller={bestSeller} currency={currency} />
    </div>
  )
}

export default BestSeller
