import React from 'react'
import "../styles/App.css" 
import MyInput from './UI/inputs/MyInput'
import MySelect from './UI/selects/MySelect'

const PostFiltter = ({filter, setFilter}) => {
  return (
    <div className='search-sort'>
        <MyInput
          value={filter.query}
          onChange={(e) => setFilter({...filter, query: e.target.value})}
          placeholder='Search...'
        />
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue='Sort by'
          options={[
            { value: 'title', name: 'By name' },
            { value: 'body', name: 'By description' },
          ]}
        />
      </div>
  )
}

export default PostFiltter