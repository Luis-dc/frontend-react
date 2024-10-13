import React, { useState } from 'react';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import Compra from './componentes/Compra';
import Catalogo from './componentes/Catalogo';

function App() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null); // Opcional, si necesitas guardar el ID del usuario
    const [compraIntentada, setCompraIntentada] = useState(false); // Estado para rastrear si se intenta realizar una compra
    const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Nuevo estado para el producto seleccionado

    const handleLogin = (token, userId) => {
        setToken(token);
        setUserId(userId);
    };

    const handleIntentarCompra = () => {
        setCompraIntentada(true); // Cambia el estado a verdadero al intentar comprar
    };

    const handleSelectProduct = (producto) => {
        setProductoSeleccionado(producto); // Establece el producto seleccionado
    };

    return (
        <div>
            <h1>Tienda en Línea</h1>
            <Catalogo onSelectProduct={handleSelectProduct} /> {/* Pasa la función para seleccionar productos */}
            {compraIntentada && !token && (
                <div>
                    <h2>Por favor, regístrate o inicia sesión para realizar la compra</h2>
                    <Registro />
                    <Login onLogin={handleLogin} />
                </div>
            )}
            {token && (
                <>
                    <h2>Bienvenido, {userId}</h2>
                    <Compra token={token} productoSeleccionado={productoSeleccionado} /> {/* Pasa el producto seleccionado a Compra */}
                </>
            )}
            <button onClick={handleIntentarCompra}>Intentar Comprar</button>
        </div>
    );
}

export default App;
