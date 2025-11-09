import React from 'react'
import './componentsStyles/Filter.css'

const Filter = ({ products, handleFilterChange }) => {
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)))
  const uniqueSubCategory = Array.from(
    new Set(products.map((p) => p.subCategory))
  )
  const uniqueSizes = Array.from(new Set(products.flatMap((p) => p.sizes)))

  return (
    <ul className='filter-list'>
      <li className='filter-item'>
        <h4>Category</h4>
        {uniqueCategories.map((category) => (
          <label key={category}>
            <input
              type='checkbox'
              onChange={() => handleFilterChange('category', category)}
            />
            {category}
          </label>
        ))}
      </li>
      <li className='filter-item'>
        <h4>Sub-Category</h4>
        {uniqueSubCategory.map((sub) => (
          <label key={sub}>
            <input
              type='checkbox'
              onChange={() => handleFilterChange('subCategory', sub)}
            />
            {sub}
          </label>
        ))}
      </li>
      <li className='filter-item'>
        <h4>Sizes</h4>
        {uniqueSizes.map((size) => (
          <label key={size}>
            <input
              type='checkbox'
              onChange={() => handleFilterChange('size', size)}
            />
            {size}
          </label>
        ))}
      </li>
    </ul>
  )
}

export default Filter
