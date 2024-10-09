import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import '/Users/mica/Desarrollo Web & Mobile/redditapp/src/components/index.css';

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a href="https://www.google.com/"><img src="Logo-UCU.png" width="100" /></a>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                </li>
                <li className="nav-item">
                </li>
            </ul>
            <div className="search-bar d-flex justify-content-center align-items-center mr-auto">
                <i className="ml-4 bi bi-search"></i>
                <input type="text" className="form-control" placeholder="Search Reddit" />
            </div>
            <button className="create-btn d-flex align-items-center"><i className="bi bi-plus"> Create</i></button>
            <a href="https://www.google.com/"><img src="avatar_default.png" className="rounded-circle p-0.5 bg-light" width="40"/></a>
        </div>
       
     </nav>
  );
}

export default NavbarComponent;
