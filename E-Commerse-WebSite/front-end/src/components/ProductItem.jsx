import React from 'react'
import { Link } from 'react-router-dom'
import './componentsStyles/ProductItem.css'
const ProductItem = ({products, currency}) => {
  return (
    <>
      {' '}
      {products.map((product) => (
        <Link
          to={`/product/${product.id}`}
          className='product-card'
          key={product.id}
        >
          <div>
            <img src={product.image} alt={product.name} />
          </div>

          <h3>{product.name}</h3>
          <p>
            <span>{product.price}</span>
            {currency}
          </p>
        </Link>
      ))}
    </>
  )
}

export default ProductItem
