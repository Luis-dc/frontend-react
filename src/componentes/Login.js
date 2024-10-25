import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://18.219.186.24:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) { // Asegúrate de que la respuesta sea OK
                if (data.token) {
                    localStorage.setItem('token', data.token); // Guardar el token en localStorage
                    onLogin(data.token, data.userId); // Pasar el token y ID del usuario
                } else {
                    alert('Error: ' + data.message);
                }
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Hubo un error al intentar iniciar sesión.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Inicio de Sesión</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default Login;
