import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/Select/MySelect'

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({...filter , query: e.target.value})}
        placeholder='Searching'
      />
      <MySelect
        value={filter.sort}
        onChange={slectedSort => setFilter({...filter, sort: slectedSort})}
        defaultValue='Sorting by'
        options={[
          {
            value: 'title',
            name: 'Sort by ',
          },
          {
            value: 'body',
            name: 'Sort by ',
          },
        ]}
      />
    </div>
  )
}

export default PostFilter
