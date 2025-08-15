import { use, useState } from 'react'
import './App.css'
// import Counter from './components/Counter.jsx'
// import PostItem from './components/PostItem.jsx'
import PostList from './components/PostList.jsx'
import MyButton from './components/UI/button/MyButton.jsx'
import MyInput from './components/UI/input/MyInput.jsx'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Post ', body: 'Description ' },
    { id: 2, title: 'Post ', body: 'Description ' },
    { id: 3, title: 'Post ', body: 'Description ' },
  ])

  const [post, setPost] = useState({ title: '', body: '' })

  const addNewPost = (e) => {
    e.preventDefault()

    setPosts([...posts, { ...post, id: Date.now() }])

    setPost({ title: '', body: '' })
  }

    const deletePost =() => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


  return (
    <div className='App'>
      <form>
        <MyInput
          placeholder='Enter the title'
          value={post.title}
          onChange={(e) => setPost({...post, title: e.target.value})}
        />
        <MyInput
          placeholder='Enter the description'
          value={post.body}
          onChange={(e) => setPost({...post, body: e.target.value})}
        />
        <MyButton onClick={addNewPost}>Create Post</MyButton>
      </form>
      <PostList posts={posts} title='Posts List 1' />
    </div>
  )
}

export default App
