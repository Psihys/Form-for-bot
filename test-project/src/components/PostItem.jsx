import React from 'react';
import '../styles/PostItem.css'; // Импортируем CSS

const PostItem = (props) => {


  return (
    <div className="post-item">
      <h2 className="post-title">{props.post.title} .{props.number}</h2>
      <p className="post-text">
        {props.post.body}
      </p>
      <button onClick={} className='post-button'>Delete</button>
    </div>
  );
};

export default PostItem;
