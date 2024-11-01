import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
// import '/Users/mica/Desarrollo Web & Mobile/redditapp/src/components/index.css';
import '../NavbarComponent/NavbarComponent.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {
    const { logout } = useAuth0();
    const navigate = useNavigate();

    const handleViewProfile = () => {
      navigate('/user-profile'); // Ajustado a la ruta sin la anidación de /main
    };
    
    const handleCreatePost = () => {
        navigate('/create-post'); // Ajustado a la ruta sin la anidación de /main
    };

    const handleMainFeed = () => {
        navigate('/'); // Ajustado a la ruta sin la anidación de /main
    };

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        // Additional actions, like sending search value to server
        navigate(`/search?query=${encodeURIComponent(searchValue)}`);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="d-flex justify-content-center align-items-center mr-auto">
                    <button onClick={handleMainFeed} style={{border: 'none', backgroundColor:'transparent' }} ><img src="Logo-UCU.png" width="100" /></button>
                </div>
                <div className="search-bar d-flex justify-content-center align-items-center mr-auto">
                    <button className="search-btn" onClick={handleSearch}><i className="ml-4 bi bi-search"></i></button>
                    <input type="text" className="form-control search-bar-input" placeholder="Search Reddit" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                <div className="d-flex align-items-right">
                    <button className="create-btn d-flex align-items-center" onClick={handleCreatePost} >
                        <i className="bi bi-plus"></i>
                        <span className="text-large" >Create</span>
                    </button>
                    <div class="dropdown">
                        <button class="dropdown-toggle">
                            <img src="avatar_default.png" className="rounded-circle p-0.5 bg-light" width="40"/>
                        </button>
                        <div class="dropdown-menu">
                            <button className="dropdown-item d-flex justify-content-left align-items-center" onClick={handleViewProfile}>
                                <img src="avatar_default.png" className="rounded-circle p-0.5 bg-light" width="35"/> 
                                <span className="text-large" >View Profile</span>
                            </button>
                            <hr/>
                            <button className="dropdown-item d-flex justify-content-left align-items-center" onClick={() => logout({ returnTo: window.location.origin })}>
                                <i className="bi bi-box-arrow-in-right icon-large"></i> 
                                <span className="text-large">Log out</span>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;
