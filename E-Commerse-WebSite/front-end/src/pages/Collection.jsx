import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import Filter from '../components/Filter'

import './PageStyles/CollectionPage.css'

const Collection = () => {
  const { products } = useContext(ShopContext)

  const [filteredList, setFilteredList] = useState(products)
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    subCategory: [],
    size: [],
  })

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[type].includes(value)
      return {
        ...prev,
        [type]: isSelected
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      }
    })
  }

  useEffect(() => {
    let filtered = [...products]

    if (selectedFilters.category.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.category.includes(p.category)
      )
    }

    if (selectedFilters.subCategory.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.subCategory.includes(p.subCategory)
      )
    }

    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((s) => selectedFilters.size.includes(s))
      )
    }

    setFilteredList(filtered)
  }, [selectedFilters, products])

  return (
    <div className='collection__container'>
      <aside className='collection__filter'>
        <Filter products={products} handleFilterChange={handleFilterChange} />
      </aside>
      <div className='collection__products-container'>
        <ProductItem products={filteredList} currency='$' />
      </div>
    </div>
  )
}

export default Collection
