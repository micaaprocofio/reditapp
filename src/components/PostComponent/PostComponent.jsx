import React, { useState } from 'react';
import '/Users/mica/Desarrollo Web & Mobile/redditapp/src/components/index.css';


function PostComponent({ title, content, subreddit, time }) {
    const [isDisabled, setIsDisabled] = useState(true);

    return (

        <div class="card mb-3 mt-3">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">{subreddit} - {time}</h6>
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{content}</p>
                <div className="d-flex">
                    <button className="general-button btn btn-light me-2" style={{ backgroundColor: isDisabled ? '#e9edf0' : '#fff' }}>
                        <button className="vote-buttons up-button btn btn-light"><i className="bi bi-arrow-up"> </i></button> 0  <button className="vote-buttons down-button btn btn-light"><i className="bi bi-arrow-down"></i></button>
                    </button>
                    <button className="comment btn btn-light ml-4">
                        <i className="bi bi-chat"></i> 19
                    </button>
                </div>
            </div>
        </div>

    );
}

export default PostComponent;
