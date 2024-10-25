// Carrito.js
import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';

const Carrito = ({ token }) => {
    const { carrito, eliminarDelCarrito, limpiarCarrito, actualizarCantidad } = useCarrito();
    const [mostrarCompra, setMostrarCompra] = useState(false); // Estado para mostrar la información de compra

    const handleEliminar = (id_producto) => {
        eliminarDelCarrito(id_producto);
    };

    const handleLimpiar = () => {
        limpiarCarrito();
    };

    const aumentarCantidad = (id_producto) => {
        actualizarCantidad(id_producto, 1); // Aumentar cantidad
    };

    const disminuirCantidad = (id_producto) => {
        actualizarCantidad(id_producto, -1); // Disminuir cantidad
    };

    // Calcular el total
    const calcularTotal = () => {
        return carrito.reduce((total, producto) => {
            const precio = parseFloat(producto.precio) || 0; // Asegúrate de que sea un número
            const cantidad = parseInt(producto.cantidad) || 0; // Asegúrate de que sea un número
            return total + precio * cantidad;
        }, 0);
    };

    const handleProceedToCheckout = () => {
        if (!token) {
            alert('Debes iniciar sesión para proceder con la compra.');
            return;
        }

        setMostrarCompra(true); // Cambiar el estado para mostrar la información de compra
    };

    return (
        <div className="container mt-5">
            {mostrarCompra ? ( // Mostrar información de compra si se procede
                <div>
                    <h2>Bienvenido, Realizar Compra</h2>
                    {carrito.length === 0 ? (
                        <p>No hay productos en el carrito.</p>
                    ) : (
                        carrito.map((producto) => (
                            <div key={producto.id_producto}>
                                <h5>Producto Seleccionado:</h5>
                                <p>Nombre: {producto.nombre}</p>
                                <p>Precio: Q{parseFloat(producto.precio).toFixed(2)}</p>
                                <p>Descripción: {producto.descripcion || 'Descripción no disponible.'}</p>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div>
                    <h2>Carrito de Compras</h2>
                    {carrito.length === 0 ? (
                        <p>No hay productos en el carrito.</p>
                    ) : (
                        <div>
                            <ul className="list-group">
                                {carrito.map((producto) => (
                                    <li key={producto.id_producto} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5>{producto.nombre}</h5>
                                            <p>Precio: Q{parseFloat(producto.precio).toFixed(2)}</p>
                                            <p>Cantidad: {producto.cantidad}</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-secondary btn-sm" onClick={() => disminuirCantidad(producto.id_producto)}>-</button>
                                            <span className="mx-2">{producto.cantidad}</span>
                                            <button className="btn btn-secondary btn-sm" onClick={() => aumentarCantidad(producto.id_producto)}>+</button>
                                            <button className="btn btn-danger ml-2" onClick={() => handleEliminar(producto.id_producto)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <h4 className="mt-3">Total: Q{isNaN(calcularTotal()) ? '0.00' : calcularTotal().toFixed(2)}</h4> {/* Mostrar el total */}
                            <button className="btn btn-warning mt-3" onClick={handleLimpiar}>
                                Limpiar Carrito
                            </button>
                            <button className="btn btn-success mt-3" onClick={handleProceedToCheckout}>
                                Proceder con la Compra
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Carrito;
