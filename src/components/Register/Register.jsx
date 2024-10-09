// import './InformacionPersonal.css';
// import '/Users/mica/Desarrollo Web & Mobile/cvapp/src/components/index.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import '/Users/mica/Desarrollo Web & Mobile/redditapp/src/components/index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Register() {
   
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función para manejar el envío de datos al backend
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5001/api/user/registry', { name, surname, username, birthDate, email, password })
        .then( response => {
          alert(response.data.message);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
    };

    return(
    <container className="d-flex flex-column justify-content-center col-6 mt-3 vh-auto" >
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
            <div className="d-flex justify-content-center col-sm-12">
                <input type="text"  placeholder='Name' style={{ backgroundColor: '#fff' }} className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            </div>
            <div className="row mb-3">
                <div className="d-flex justify-content-center col-sm-12">
                    <input type="text"  placeholder='Surname' style={{ backgroundColor: '#fff' }} className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="d-flex justify-content-center col-sm-12">
                    <input type="text"  placeholder='Username' style={{ backgroundColor: '#fff' }} className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="d-flex justify-content-center col-sm-12">
                    <input type="date"  placeholder='Birth Date' style={{ backgroundColor: '#fff' }} className="form-control" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="d-flex justify-content-center col-sm-12">
                    <input type="mail"  placeholder='Email' style={{ backgroundColor: '#fff' }} className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="d-flex justify-content-center col-sm-12">
                <input type="password"  placeholder='Password' style={{ backgroundColor: '#fff' }} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="d-flex justify-content-center col-sm-12">
                    <div className="d-flex col-6 text-secondary">
                        <input type="checkbox"  style={{ transform: 'scale(0.7)', backgroundColor: '#fff' }} className="form-control custom-checkbox" name='flexCheck' id='flexCheckDefault'/>
                        <label for="flexCheck" className="custom-label"> I have read and agree to the terms</label>
                    </div>
                    
                </div>
                
            </div>
            <div className="row mb-3">
                <div className="d-flex justify-content-center col-sm-12">
                    <button className="signin mb-12" type="submit">Sign up</button>
                </div>

            </div>
        </form>
    </container>
    );
  }
 
  export default Register;
  
