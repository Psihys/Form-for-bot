import { useMemo, useState } from 'react'
import './App.css'
import PostList from './components/PostList.jsx'
import PostForm from './components/PostForm.jsx'
import PostFilter from './components/PostFilter.jsx'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'React', body: 'Frontend library' },
    { id: 2, title: 'Node', body: 'Backend runtime' },
    { id: 3, title: 'CSS', body: 'Styling language' },
  ])

  const [filter, setFilter] = useState({ sort: '', query: '' })

  const sortedPosts = useMemo(() => {
    console.log('Worked')
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      )
    } else {
      return posts
    }
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
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
      <PostFilter filter={filter} setFilter={setFilter} />
      {sortedAndSearchedPosts.length !== 0 ? (
        <h1 style={{ textAlign: 'center' }}>Posts List</h1>
      ) : (
        <h1 style={{ textAlign: 'center', color: 'red' }}>No posts</h1>
      )}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} />
    </div>
  )
}

export default App
