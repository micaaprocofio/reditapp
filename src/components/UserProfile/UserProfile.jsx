import React from 'react';
import '../UserProfile/UserProfile.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import MainFeedComponent from '../MainFeedComponent/MainFeedComponent';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [activeTab, setActiveTab] = useState('post');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los posts desde el backend
        fetch('http://localhost:5001/api/main/get/post')
            .then(response => response.json())
            .then(data => setPosts(data.message)) // Asumiendo que data.message contiene el array de posts
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleCreatePost = () => {
        navigate('/create-post'); // Ajustado a la ruta sin la anidación de /main
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    
    return (
    <div class="container-profile">
        <div class="main-content">
            <div class="profile-header">
                <img src="avatar_default.png" className="avatar" />
                <div>
                    <h2 class="username">mprocofio</h2>
                    <p class="user-id">u/mprocofio</p>
                </div>
            </div>
            <div class="tabs">
                <button className={`tab ${activeTab === 'post' ? 'active' : ''}`} onClick={() => handleTabChange('post')}>Posts</button>
                <button className={`tab ${activeTab === 'comments' ? 'active' : ''}`} onClick={() => handleTabChange('comments')}>Comments</button>
                <button className={`tab ${activeTab === 'upvoted' ? 'active' : ''}`} onClick={() => handleTabChange('upvoted')}>Upvoted</button>
                <button className={`tab ${activeTab === 'downvoted' ? 'active' : ''}`} onClick={() => handleTabChange('downvoted')}>Downvoted</button>
            </div>
            {posts.length === 0 ? (
                <div class="no-posts">
                <img src="robot-empty.png" className="avatar" />
                    <p>u/mprocofio hasn't posted yet</p>
                </div>
            ) : (
                activeTab === 'post' && (
                    <div>
                        <div className="create-post">
                            <button className="create-btn profile-btn d-flex align-items-right" onClick={handleCreatePost}>
                                <i className="bi bi-plus"></i>
                                <span className="text-large">Create</span>
                            </button>
                        </div>
                        <MainFeedComponent action="get" />
                    </div>
                ))
            }
            { activeTab === 'comments' && (
                <div class="no-posts">
                <img src="robot-empty.png" className="avatar" />
                    <p>u/mprocofio hasn't comments yet</p>
                </div>
            )}
            { activeTab === 'upvoted' && (
                <div class="no-posts">
                <img src="robot-empty.png" className="avatar" />
                    <p>u/mprocofio hasn't upvoted yet</p>
                </div>
            )}
            { activeTab === 'downvoted' && (
                <div class="no-posts">
                <img src="robot-empty.png" className="avatar" />
                    <p>u/mprocofio hasn't downvoted yet</p>
                </div>
            )} 
        </div>
        <div className="sidebar-profile">
            {/* Barra lateral con información del perfil */}
            <h3 className="username">mprocofio</h3>
            <div className="user-stats">
                <div>
                    <p>1</p>
                    <span>Post karma</span>
                </div>
                <div>
                    <p>0</p>
                    <span>Comment karma</span>
                </div>
            </div>
            <div className="cake-day">
                <p>Oct 27, 2024</p>
                <span>Cake day</span>
            </div>
        </div>
    </div>
    );
}

export default UserProfile;
