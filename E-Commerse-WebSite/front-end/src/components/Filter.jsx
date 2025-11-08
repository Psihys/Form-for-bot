import React from 'react'
import './componentsStyles/Filter.css'

const Filter = ({ products }) => {
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)))
  const uniqueSubCategory = Array.from(
    new Set(products.map((p) => p.subCategory))
  )
  const uniqueSizes = Array.from(new Set(products.flatMap((p) => p.sizes)))
  return (
    <ul className='filter-list'>
        <li className='filter-item'>
        {uniqueCategories.map((category) => (
          <label key={category}>
            <input type='checkbox' name={category} />
            {category}
          </label>
        ))}
      </li>
      <li className='filter-item'>
        {uniqueSubCategory.map((subCategory) => (
          <label key={subCategory}>
            <input type='checkbox' name={subCategory} />
            {subCategory}
          </label>
        ))}
      </li>
      <li className='filter-item'>
        {uniqueSizes.map((size) => (
          <label key={size}>
            <input type='checkbox' name={size} />
            {size}
          </label>
        ))}
      </li>
    </ul>
  )
}

export default Filter
