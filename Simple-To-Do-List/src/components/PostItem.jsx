import React from 'react';
import '../styles/PostItem.css'; // Импортируем CSS
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {


  return (
    <div className="post-item">
      <h2 className="post-title">{props.post.title} .{props.number}</h2>
      <p className="post-text">
        {props.post.body}
      </p>
      <MyButton onClick={() => props.remove(props.post)}  className='post-button'>Delete</MyButton>
    </div>
  );
};

export default PostItem;
