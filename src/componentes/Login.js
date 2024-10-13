import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://18.219.186.24:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.token) {
            onLogin(data.token, data.userId); // Asumiendo que el ID del usuario se envía junto con el token
        } else {
            alert(data.message);
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
