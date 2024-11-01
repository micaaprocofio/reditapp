import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostComponent from '../PostComponent/PostComponent';
import Comment from '../Comment/Comment';
import '../CommentDetail/CommentDetail.css';
import axios from 'axios';

function CommentDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(''); // Estado para la fecha de creación
  const [showButtons, setShowButtons] = useState(false); // Estado para controlar la visibilidad de los botones

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.message); 
        } else {
          console.error('Error al obtener el post');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchPost();
  }, [postId]); // Dependencia solo de postId para evitar múltiples ejecuciones

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/comments-post/${postId}`);
      if (response.status === 200) {
        setComments(response.data.message); // Asigna los comentarios recibidos a la variable de estado
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // useEffect para actualizar los comentarios cuando se monta el componente
  useEffect(() => {
    fetchComments();
  }, [postId]); // Se ejecutará cada vez que cambie el `postId`

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCancel = () => {
    setComment('');
    setShowButtons(false); 
  };

  const getCurrentDate = () => {
    const current = new Date();
    const day = String(current.getDate()).padStart(2, '0');
    const month = String(current.getMonth() + 1).padStart(2, '0'); 
    const year = current.getFullYear();
    const hours = String(current.getHours()).padStart(2, '0');
    const minutes = String(current.getMinutes()).padStart(2, '0');
    const seconds = String(current.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleAddComment = () => {

    const creationDate = getCurrentDate();
    setDate(creationDate);

    const postData = {
      content : comment,
      subreddit: "user1111",
      time: "hace 16 horas",
      created_at: creationDate,
      id:3,
      id_post: postId
    };
    
    axios.post('http://localhost:5001/api/main/create/comment', postData)
      .then((response) => {
        console.log('Datos enviados con éxito:', response.data.message);
        setComments(response.data.message); // Sobreescribe los comentarios con los nuevos datos
      })
      .catch((error) => {
        console.error('Error enviando los datos:', error);
      });
    
    
    setComment('');
    setShowButtons(false);
  };


  return (
    <div className="col-md-6">
        <div className="comments-post-content"  >
          <PostComponent post={post}  />
        </div>
        
        <div className="comment-box">

          {!showButtons ? 
          (
            <input
            type="text"
            placeholder="Add a comment"
            onFocus={() => setShowButtons(true)} 
            className="comment-input"
          />
          ):(
            <div>
              <textarea
                placeholder="Add a comment"
                value={comment}
                onChange={handleCommentChange} 
                className="comment-input"
              ></textarea>
              <div className="comment-actions">
                <button onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleAddComment} className="post-btn">
                  Comment
                </button>
              </div>
            </div>
          )}

        </div>

        <div>
          { comments.length > 0 ?  
            (comments.map((comment, index) => (
                <div key={index} className="post-content"  >
                  <Comment comment={comment}  />
                </div>
                ))) :
                (
                  <div className="post-content" >
                    <div>
                      <img src="/robot-empty.png" alt="Descripción de la imagen" width="100" />
                      <p>the post hasn't comments yet</p>
                    </div>
                    
                  </div>
                )
                }
          </div>
    </div>
  );
}

export default CommentDetail;
