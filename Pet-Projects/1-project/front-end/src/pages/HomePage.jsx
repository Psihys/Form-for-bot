import { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import { getAllProducts } from '../api/api'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (isLoading) {
    return <p>Loading products...</p>
  }

  
  return (
    <div>
      <h1>Our Products</h1>
      <ProductList products={products} />
    </div>
  )
}

export default HomePage
