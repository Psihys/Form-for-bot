import React from 'react'

import './componentsStyles/LatestCollectionList.css'

import ProductItem from './ProductItem'

const LatestCollectionList = ({ latestProducts, currency }) => {
  return (
    <div className='latest-collection-list'>
     <ProductItem products={latestProducts} currency={currency} />
    </div>
  )
}

export default LatestCollectionList
