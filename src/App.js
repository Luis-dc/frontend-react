// App.js
import React, { useState } from 'react';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import CompraCarrito from './componentes/CompraCarrito'; // Importa el nuevo componente
import Catalogo from './componentes/Catalogo';
import Carrito from './componentes/Carrito'; 
import { CarritoProvider } from './context/CarritoContext';
import { Modal, Button } from 'react-bootstrap';

function App() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [compraIntentada, setCompraIntentada] = useState(false);
    const [modalContent, setModalContent] = useState(''); 
    const [showModal, setShowModal] = useState(false);

    const handleLogin = (token, userId) => {
        setToken(token);
        setUserId(userId);
        setShowModal(false);
    };

    const handleIntentarCompra = () => {
        if (!token) {
            setShowModal(true);
        } else {
            setCompraIntentada(true); // Esto puede ser útil para alguna lógica adicional
        }
    };

    return (
        <CarritoProvider>
            <div>
                <h1>Tienda en Línea</h1>
                <Catalogo onSelectProduct={(producto) => {}} />

                {token && <h2>Bienvenido, {userId}</h2>}
                
                {/*<button onClick={handleIntentarCompra}>Intentar Comprar</button>*/}
                
                <Carrito />

                {token && <CompraCarrito token={token} />} {/* Muestra el componente CompraCarrito si hay un token */}

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalContent === 'login' && <Login onLogin={handleLogin} />}
                        {modalContent === 'register' && <Registro />}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

                {!token && (
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="primary" onClick={() => {
                            setModalContent('register');
                            setShowModal(true);
                        }}>Registrarse</Button>
                        <Button variant="secondary" onClick={() => {
                            setModalContent('login');
                            setShowModal(true);
                        }} style={{ marginLeft: '10px' }}>Iniciar Sesión</Button>
                    </div>
                )}
            </div>
        </CarritoProvider>
    );
}

export default App;
