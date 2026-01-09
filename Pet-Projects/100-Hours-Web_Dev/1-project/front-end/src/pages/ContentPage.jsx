import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deleteProduct, getProductById, updateProduct } from '../api/api'

const ContentPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
  })
  const [loading, setLoading] = useState(true) // initial fetch
  const [saving, setSaving] = useState(false)  // when updating product
  const [error, setError] = useState('')

  // Fetch product by ID on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        console.error('Failed to fetch product:', err)
        setError('Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  // Universal input change handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await updateProduct(id, product)
      console.log('Product updated successfully')
      navigate('/') // redirect after saving
    } catch (err) {
      console.error('Failed to update product:', err)
      setError('Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  // Delete product
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await deleteProduct(id)
      navigate('/')
    } catch (err) {
      console.error('Failed to delete product:', err)
      setError('Failed to delete product')
    }
  }

  if (loading) return <div>Loading product...</div>

  return (
    <div className="content-page">
      <h1>Edit Product</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <input
          name="name"
          type="text"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          name="image"
          type="url"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={handleDelete}>
          Delete Product
        </button>
      </form>
    </div>
  )
}

export default ContentPage
