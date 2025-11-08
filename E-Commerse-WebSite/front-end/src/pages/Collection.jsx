import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

import './PageStyles/CollectionPage.css'
import ProductItem from '../components/ProductItem'
import Filter from '../components/Filter'

const Collection = () => {
  const { products } = useContext(ShopContext)
  return (
    <div className='collection__container'>
      <aside className='collection__filter'>
        
          <Filter products={products}/>
       
      </aside>
      <div className='collection__products-container'>
        <ProductItem products={products} currency='$' />
      </div>
    </div>
  )
}

export default Collection
