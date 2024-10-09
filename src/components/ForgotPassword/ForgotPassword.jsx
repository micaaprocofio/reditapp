import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Enviar la solicitud al backend para generar el token
    axios.post('http://localhost:5001/api/forgot-password', { email })
      .then(response => {
        setMessage('Se ha enviado un enlace para restablecer tu contraseña al correo electrónico.');
      })
      .catch(error => {
        setMessage('Error al enviar el correo. Verifica tu dirección de correo electrónico.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
