import Title from './Title'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import './componentsStyles/LatestCollection.css'
import LatestCollectionList from './LatestCollectionList'

const LatestCollection = () => {
  const { products, currency } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8))
  }, [])
  return (
    <div className='latest-collection-container'>
      <Title
        title={'Latest'}
        subtitle={'Collection'}
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'
        }
      />
      <LatestCollectionList latestProducts={latestProducts} currency={currency} />
    </div>
  )
}

export default LatestCollection
