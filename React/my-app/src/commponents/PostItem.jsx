import React from 'react'
import '../styles/App.css'
import MyButton from './UI/buttons/MyButton'

const PostItem = (props) => {
    
  return (
    <div className='post'>
        <div className='post-container'>
          <strong>{props.number}. {props.post.title}</strong>
          <div> {props.post.body} </div>
        </div>
        <MyButton
        onClick={() => props.remove(props.post)}
        className='post-button'>Delete post</MyButton>
      </div>
  )
}

export default PostItem