import React, { useState } from 'react';
// import '/Users/mica/Desarrollo Web & Mobile/redditapp/src/components/index.css';
import { useNavigate } from 'react-router-dom';
import '../Comment/Comment.css'

function Comment({comment}) {

    return (
        <div class="card-comment mb-3 mt-3">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">{comment.subreddit} - {comment.created_at}</h6>
                {/* <h5 class="card-title">{comment.title}</h5> */}
                <p class="card-text">{comment.content}</p>
                {/* <div className="d-flex">
                    <button className="general-button btn btn-light me-2" onClick={handleCommentClick} style={{ backgroundColor: isDisabled ? '#e9edf0' : '#fff' }}>
                        <button className="vote-buttons up-button btn btn-light"><i className="bi bi-arrow-up"> </i></button> {post.likes}  <button className="vote-buttons down-button btn btn-light"><i className="bi bi-arrow-down"></i></button>
                    </button>
                    <button className="comment btn btn-light ml-4">
                        <i className="bi bi-chat"></i> {post.comments}
                    </button>
                </div> */}
            </div>
        </div>

    );
}

export default Comment;
