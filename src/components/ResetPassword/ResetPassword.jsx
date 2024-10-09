import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams(); // Obtener el token de la URL
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Enviar la nueva contraseña al backend
    axios.post(`http://localhost:5001/api/reset-password/${token}`, { password })
      .then(response => {
        setMessage('Tu contraseña ha sido restablecida.');
        history.push('/login'); // Redirigir al login
      })
      .catch(error => {
        setMessage('Error al restablecer la contraseña. Intenta nuevamente.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Restablecer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
