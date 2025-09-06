import React from 'react'
import '../styles/searchBar.css'

const SearchBar = ({searchQuery, setSearchQuery, handleSearch}) => {
  return (
    <div className='search-board'>
      <input
        type='text'
        placeholder='Enter your city'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e)
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar
