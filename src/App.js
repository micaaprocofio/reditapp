
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import SidebarComponent from './components/SidebarComponent/SidebarComponent';
import MainFeedComponent from './components/MainFeedComponent/MainFeedComponent';
import UserProfile from './components/UserProfile/UserProfile';
import { Col, Row } from 'react-bootstrap';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import CommentDetail from './components/CommentDetail/CommentDetail';
import Search from './components/Search/Search';


const domain = 'dev-i2bmr4cotfdamz1b.us.auth0.com';
const clientId = 'y4HjCCWV3qNqfbKjjQuqgRrx3jCBELN5';
const audience = 'https://redis-app-backend';

function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/main`}
      audience={audience}
      scope="read:posts write:posts"
    >
      <Router>
        <AppRoutes />
      </Router>
    </Auth0Provider>
  );
}

function AppRoutes() {
  const { isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();

  // console.log(getAccessTokenSilently());
  // const handleShowCreate = () => setShowCreate(true);

  if (isLoading) {
    return <div>Loading...</div>; // Indicador de carga mientras se verifica la autenticación
  }
  
  return (
    <div className="container-xxl">
      {!isAuthenticated ? (
        <div className="login-container d-flex justify-content-center align-items-center">
          <div className="left-side">
            <img src="Logo-UCU.png" className="ucu-logo" />
          </div>
          <header className="right-side">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/main" element={<Navigate to="/" />} />
            </Routes>
          </header>
        </div>
      ) : (
        <div className="App">
          <NavbarComponent/>
          <Row>
            <Col>
              <div className='d-flex justify-content-center align-items-center mr-auto'>
                <SidebarComponent />
                <Routes>
                  <Route path="/main" element={<MainFeedComponent action="get" />} />
                  <Route path="/create-post" element={<MainFeedComponent action="create" />} />
                  <Route path="/user-profile" element={<UserProfile />} />
                  {/* <Route path="/comments/:commentId" element={<CommentDetail />} /> */}
                  <Route path="/post/:postId" element={<CommentDetail />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="*" element={<Navigate to="/main" />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default App;
