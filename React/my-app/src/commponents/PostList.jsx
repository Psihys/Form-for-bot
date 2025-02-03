import React from 'react'
import '../styles/App.css'
import PostItem from './PostItem'

const PostList = ({ posts, title, remove }) => {



  return (
    <div className='post-list'>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      {posts.map((post, index) => (
        <div>
          <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
        </div>
      ))}
    </div>
  )
}

export default PostList
