import React from 'react'
import { deleteProduct } from '../api/api'
import { useNavigate } from 'react-router'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    console.log(id)
    try {
      await deleteProduct(id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='card-container'>
      <img src={product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>${product.price}$</p>
      </div>
      <div>
        <button onClick={() => navigate(`/edit/${product._id}`)}>
          Edit
        </button>

        <button onClick={() => handleDelete(product._id)}>Delete</button>
      </div>
    </div>
  )
}

export default ProductCard
