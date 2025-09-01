import React, { useState } from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

const PostForm = ({create}) => {

    const [post, setPost] = useState({ title: '', body: '' })

    const addNewPost = (e) => {
    e.preventDefault()

    const newPost = {
      ...post, id: Date.now()
    }
    create(newPost)
    setPost({ title: '', body: '' })
  }

  return (
    <div>
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
    </div>
  )
}

export default PostForm