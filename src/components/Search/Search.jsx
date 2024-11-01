import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PostComponent from '../PostComponent/PostComponent';
import { Link } from 'react-router-dom';


const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('post');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResults([]); // Clear results when the tab is changed
    fetchSearchResults(tab, query); // Trigger new fetch with the updated tab
  };

  const fetchSearchResults = async (tab, query) => {
    setLoading(true);
    try {
        const response = await axios.get(`http://localhost:5001/api/search-${activeTab}?query=${query}`);
      setResults(response.data.message);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults(activeTab, query);
  }, [activeTab]);
  return (
    <div className="search-results">
      {/* <h2>Search Results for: "{query}"</h2> */}
        <div class="tabs">
            <button className={`tab ${activeTab === 'post' ? 'active' : ''}`} onClick={() => handleTabChange('post')}>Posts</button>
            <button className={`tab ${activeTab === 'comments' ? 'active' : ''}`} onClick={() => handleTabChange('comments')}>Comments</button>
            <button className={`tab ${activeTab === 'user' ? 'active' : ''}`} onClick={() => handleTabChange('user')}>User</button>
        </div>

        {results.length === 0 ? (
            // Display error image and message if no results
            <div className="no-posts">
                <img src="robot-empty.png" alt="No results found" className="avatar" />
                <p>No results found for "{query}"</p>
            </div>
        ) : (
            // Display results based on the active tab
            <div>
            {activeTab === 'post' && (
                results.map((post) => (
                    <div key={post.id} className="post-content" >
                        <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <PostComponent post={post}  />
                        </Link>
                    </div>)
            )
            )}
            {activeTab === 'comments' && (
                results.map((comment) => (
                <div key={comment.id} className="comment-content">
                    <p>{comment.content}</p>
                    <span className="meta">{comment.time} . {comment.subreddit}</span>
                </div>
                ))
            )}
            {activeTab === 'user' && (
                <p>User-related content could go here.</p>
            )}
            </div>
        )}
    </div>
  );
};

export default Search;


// {results.length > 0 && activeTab === 'post' ? (
//     (activeTab === 'post' && (
//             results.map((post) => (
//             <div key={post.id} className="post-content" >
//                 <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <PostComponent post={post}  />
//                 </Link>
//             </div>)
//     )) : 
//     (
//         <div class="no-posts">
//             <img src="robot-empty.png" className="avatar" />
//             <p>No results found for "{query}"</p>
//         </div>