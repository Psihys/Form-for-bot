import React, { useMemo, useState } from 'react'
import './styles/App.css'
import PostList from './commponents/PostList'
import PostForm from './commponents/PostForm'

import PostFiltter from './commponents/PostFiltter'

function App() {
  const[filter, setFilter] = useState({ sort: '', query: '' })

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Js',
      body: 'Javascript - programm language',
    },
    {
      id: 2,
      title: 'Js',
      body: 'Javascript - programm language',
    },
    {
      id: 3,
      title: 'Js',
      body: 'Javascript - programm language',
    },
  ])

  const sortedPosts = useMemo(() => {
    console.log('Function workes correct')
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      )
    }
    if (filter.query) {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(filter.query)
      )
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    )
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  return (
    <div className='App'>
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <PostFiltter filter={filter} setFilter={setFilter} />
      {sortedAndSearchedPosts.length !== 0 ? (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={'First Posts List'}
        />
      ) : (
        <h1 style={{ textAlign: 'center', color: 'red' }}>Posts not found</h1>
      )}
    </div>
  )
}

export default App
