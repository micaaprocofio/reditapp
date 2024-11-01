import React from 'react';
import PostComponent from '../PostComponent/PostComponent';
import '../MainFeedComponent/MainFeedComponent.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MainFeedComponent({action}, {onShowCreate}) {
  const [justifyActive, setJustifyActive] = useState('');
  const [date, setDate] = useState(''); // Estado para la fecha de creación
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState('text');
  const maxChars = 300; 

  const handleChangeTitle = (event) => {
      const value = event.target.value;
      setTitle(value);
      setCharCount(value.length);
  };

  const handleChangeContent = (event) => {
    const value = event.target.value;
    setContent(value);
};

  // Función para obtener la fecha actual en un formato legible
  const getCurrentDate = () => {
    const current = new Date();
    const day = String(current.getDate()).padStart(2, '0');
    const month = String(current.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = current.getFullYear();
    const hours = String(current.getHours()).padStart(2, '0');
    const minutes = String(current.getMinutes()).padStart(2, '0');
    const seconds = String(current.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (action == 'get') {
      axios.get('http://localhost:5001/api/main/get/post')
        .then(response => {
          if (response.data && response.data.message) {
            setPosts(response.data.message); // Actualiza el estado posts
          }
          console.log(response.data.message);  // Verifica los datos en consola
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, []); // El useEffect se ejecuta cada vez que "action" cambie

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    onShowCreate = false;
    const creationDate = getCurrentDate();
    setDate(creationDate);
    // Crear el objeto que se enviará a la API
    const postData = {
      title: title,
      content: content,
      created_at: creationDate, // Añadir la fecha de creación
      subreddit:'mprocofio'
  };

    // Hacer la solicitud POST a la API
  axios.post('http://localhost:5001/api/main/create/post', postData)
      .then((response) => {
        console.log('Datos enviados con éxito:', response.data);
        // Aquí puedes limpiar el formulario o hacer otra acción luego de enviar los datos
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Error enviando los datos:', error);
      });
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [isDragging, setIsDragging] = useState(false);

  const [image, setImage] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (event) => {
      event.stopPropagation();
      setImage(null);
  };

  const handleDragEnter = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
  };

  const handleDragLeave = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
  };

  const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
  };

  const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setImage(reader.result);
          };
          reader.readAsDataURL(file);
      }
  };

  return (
    <div>
    {action === 'create' ? 
      (<div className="col-md-6">
        <div class="create-post-container">
          <h3 className="d-flex align-items-left" style={{fontWeight:'bold'}}>Create Post</h3>
          <br/>
          <div class="post-type-tabs">
              <button className={`tab ${activeTab === 'text' ? 'active' : ''}`} onClick={() => handleTabChange('text')}>Text</button>
              <button className={`tab ${activeTab === 'image' ? 'active' : ''}`} onClick={() => handleTabChange('image')}>Image</button>
          </div>
          <br/>
          <form class="post-form">
              <textarea
              type="text"
              id="textInput"
              className="form-control title-post"
              value={title}
              onChange={handleChangeTitle}
              required
              maxLength={maxChars}
              placeholder="Title *"
              />
              {title === '' && (
              <small className="text-danger">Completa este campo</small>
              )}
              <div className="d-flex justify-content-between">
              <small className="text-muted">{charCount}/{maxChars}</small>
              </div>
              <br/>
              {activeTab === 'text' && (
                  <div class="input-group">
                    <div class="editor-toolbar">
                        <button type="button"><b>B</b></button>
                        <button type="button"><i>I</i></button>
                        <button type="button"><u>U</u></button>
                        <button type="button">Link</button>
                        <button type="button">Image</button>
                    </div>
                    <textarea id="body" onChange={handleChangeContent} value={content} rows="10" placeholder="Body">
                    </textarea>
                </div>
                )
              }
              { activeTab === 'image' && (
                <div
                      className={`upload-container ${isDragging ? 'dragging' : ''}`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                  >
                      {image ? (
                          <div className="image-preview-container">
                              <img src={image} alt="Preview" className="image-preview" />
                              <button className="remove-button" onClick={handleRemoveImage}>
                                  <i className="bi bi-trash"></i>
                              </button>
                          </div>
                      ) : (
                          <div
                              className="add-image-placeholder"
                              onClick={() => document.getElementById('fileInput').click()}
                          >
                              <i className="bi bi-upload upload-icon"></i>
                              {isDragging ? 'Drop the file here' : 'Drag and Drop or upload media'}
                          </div>
                      )}
                      <input
                          type="file"
                          id="fileInput"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                      />
                  </div>
              )}
              
              <div class="submit-buttons">
                  {/* <button type="button" class="save-draft" >Save Draft</button> */}
                  <button type="submit" className="post-button" onClick={handleSubmit} disabled={title.length === 0}>Post</button>
              </div>
          </form>
          </div>
      </div>):(<div className="col-md-6">
      
      {posts.map((post, index) => (
      <div key={index}
        className="post-content" // Add a class for styling as a button
        >
        <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <PostComponent 
              // title={post.title}
              // content={post.content}
              // subreddit={post.subreddit}
              // time={post.time}
              post={post}  />
        </Link>
        </div>
      ))}
    </div>)}

   </div>
    
  );
}

export default MainFeedComponent;
