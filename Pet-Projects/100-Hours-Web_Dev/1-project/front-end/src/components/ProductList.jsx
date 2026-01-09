import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ products }) => {
  return (
    <div>
      {products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  )
}

export default ProductList
