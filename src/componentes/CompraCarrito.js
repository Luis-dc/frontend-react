// CompraCarrito.js
import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext'; // Asegúrate de tener el contexto de Carrito importado

const CompraCarrito = ({ token }) => {
    const { carrito } = useCarrito(); // Utiliza el hook useCarrito para acceder al contexto
    const [direccion_envio, setDireccionEnvio] = useState('');
    const [id_metodo_pago, setIdMetodoPago] = useState('');

    const handlePurchase = async (e) => {
        e.preventDefault();

        if (!direccion_envio || !id_metodo_pago) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            const detallesCompra = carrito.map(producto => ({
                id_producto: producto.id_producto,
                cantidad: producto.cantidad,
                precio_unitario: producto.precio,
            }));

            const total = detallesCompra.reduce((acc, item) => acc + (item.precio_unitario * item.cantidad), 0);

            const response = await fetch('http://18.219.186.24:3000/api/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    total,
                    direccion_envio,
                    id_metodo_pago,
                    detalles: detallesCompra,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(`Error: ${data.message || 'No se pudo realizar la compra.'}`);
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            alert('Hubo un error al realizar la compra. Inténtalo de nuevo.');
        }
    };

    if (!carrito || carrito.length === 0) {
        return <div>Tu carrito está vacío. Por favor, selecciona productos.</div>;
    }

    return (
        <form onSubmit={handlePurchase}>
            <h2>Realizar Compra</h2>

            {carrito.map((producto) => (
                <div key={producto.id_producto}>
                    <h4>Producto:</h4>
                    <p><strong>Nombre:</strong> {producto.nombre}</p>
                    <p><strong>Precio:</strong> Q{producto.precio}</p>
                    <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                </div>
            ))}

            <input
                type="text"
                placeholder="Dirección de Envío"
                onChange={(e) => setDireccionEnvio(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="ID Método de Pago"
                onChange={(e) => setIdMetodoPago(e.target.value)}
                required
            />
            <button type="submit">Comprar</button>
        </form>
    );
};

export default CompraCarrito;
