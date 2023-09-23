import React, { useState } from 'react'
import Comment from './comments-list'

const CommentBox = ({categoria, comments}) => {

  const comentarios = [
    { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 4, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    { id: 5, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    { id: 6, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    { id: 7, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
  ];

    return ( 

        <div className="comment-box">
      <h6>Comentarios: - {categoria} </h6>
      <div className="comments-list">
        {comentarios.map((comment) => (
          <Comment key={comment.id} text={comment.despcripcion} />
        ))}
      </div>
    </div>








     );
}
 
export default CommentBox;