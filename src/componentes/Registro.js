import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        try {
            const response = await axios.post('http://18.219.186.24:3000/api/register', {
                nombre,
                direccion,
                telefono,
                email,
                password
            });
            setMensaje(response.data.message); // Mensaje de éxito
        } catch (error) {
            console.error('Error al registrarse:', error);
            setMensaje('Error al registrarse'); // Mensaje de error
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Dirección" 
                    value={direccion} 
                    onChange={(e) => setDireccion(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Teléfono" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Registrar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default Registro;
