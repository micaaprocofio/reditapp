import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
// import { Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarComponent from './components/SidebarComponent/SidebarComponent';
import { Col, Row } from 'react-bootstrap';
import MainFeedComponent from './components/MainFeedComponent/MainFeedComponent';


function App() {
  const [justifyActive, setJustifyActive] = useState('login');;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  localStorage.clear(); //borra el user del local storage

  // Function to check if the user is logged in
  const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken'); // or sessionStorage
    if (token) {
      setIsLoggedIn(true);
    }
  };

  // Call the function on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Function to handle login success (to be passed to the Login component)
  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token); // Save token to localStorage
    setIsLoggedIn(true); // Update login state
    
  };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  // const [message, setMessage] = useState('');
  // Hacer una solicitud GET al backend
  // useEffect(() => {
  //   axios.get('http://localhost:5001/api')
  //     .then(response => {
  //       setMessage(response.data.message);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <Router>     
        <container className="container-xxl">
          <div className="App">
                  {!isLoggedIn ? (
                      <header className="App-header custom-bg-2">
                         <div className="col-md-12">
                        <div className='mb-3 d-flex flex-row justify-content-center align-items-center'>
                          <button className={`login ${justifyActive === 'login' ? 'active-button' : ''}`} onClick={() => handleJustifyClick('login')} active={justifyActive === 'login' }>LOGIN</button>
                          <button className={`register ${justifyActive === 'register' ? 'active-button' : ''}`}  onClick={() => handleJustifyClick('register')} active={justifyActive === 'register'}>REGISTER</button>
                        </div>
                        { justifyActive === 'login' &&  
                              <div className='"d-flex justify-content-center align-items-center'>
                                <div className="text-center">
                                <Routes>
                                  <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} /> 
                                  <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                                  {/* <Route path="/main" element={<NavbarComponent />} /> */}
                                </Routes>  
                                </div>
                              </div>
                        }
                        {justifyActive === 'register'  &&  
                          <div className='"d-flex justify-content-center align-items-center'>
                            <div className="text-center">
                            <Routes>
                            <Route path="/" element={<Register />} /> {/* Root path */}
                              <Route path='/register' element={<Register />}></Route> 
                            </Routes>
          
                            </div>
                          </div>
                          }
                        </div>
                      </header>

                    ) : (
                      <div>
                        <Routes>
                          <Route path="/" element={<NavbarComponent />} /> 
                          <Route path="/main" element={<NavbarComponent />} />
                        </Routes>
                          <container fluid>
                            <Row>
                              <Col>
                                <div className='d-flex justify-content-center align-items-center mr-auto'>
                                <SidebarComponent />
                                <MainFeedComponent />
                                </div>
                                
                              </Col>
                            </Row>
                          </container>
                          
                          
                      </div>
                    )}
              
          </div>
        </container>
    </Router>

  );
}

export default App;

