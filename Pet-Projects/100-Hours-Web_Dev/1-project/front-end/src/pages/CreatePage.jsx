import { useNavigate } from 'react-router'
import { useState } from 'react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to create product')
      }
      const data = await response.json()
      console.log('Product created:', data)
      setNewProduct({ name: '', price: '', image: '' })
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setLoading(false)
    }

    console.log(newProduct)
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name='name'
          type='text'
          value={newProduct.name}
          placeholder='Product Name'
        />
        <input
          onChange={handleChange}
          name='price'
          type='number'
          value={newProduct.price}
          placeholder='Price'
        />
        <input
          onChange={handleChange}
          name='image'
          type='url'
          value={newProduct.image}
          placeholder='Paste image link'
        />
        <button type='submit'>Create Product</button>
      </form>
    </div>
  )
}

export default CreatePage
