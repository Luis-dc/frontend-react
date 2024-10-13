import React, { useState } from 'react';

const Purchase = ({ token, productoSeleccionado }) => {
    const [direccion_envio, setDireccionEnvio] = useState('');
    const [id_metodo_pago, setIdMetodoPago] = useState('');
    const [cantidad, setCantidad] = useState(1); // Agregar un estado para la cantidad

    const handlePurchase = async (e) => {
        e.preventDefault();
        try {
            // Crear un objeto de detalles basado en el producto seleccionado
            const detallesCompra = [
                {
                    id_producto: productoSeleccionado.id_producto, // Usar el ID del producto seleccionado
                    cantidad: cantidad, // Usar la cantidad seleccionada
                    precio_unitario: productoSeleccionado.precio // El precio del producto seleccionado
                }
            ];

            const response = await fetch('http://18.219.186.24:3000/api/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    total: productoSeleccionado.precio * cantidad, // Calcular el total según la cantidad
                    direccion_envio,
                    id_metodo_pago,
                    detalles: detallesCompra, // Aquí pasamos el objeto de detalles creado dinámicamente
                }),
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            alert('Hubo un error al realizar la compra. Inténtalo de nuevo.');
        }
    };

    // Agregar una condición para manejar el caso donde productoSeleccionado puede ser undefined
    if (!productoSeleccionado) {
        return <div>Por favor, selecciona un producto.</div>;
    }

    return (
        <form onSubmit={handlePurchase}>
            <h2>Realizar Compra</h2>

            {/* Mostrar información del producto seleccionado */}
            <div>
                <h4>Producto Seleccionado:</h4>
                <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
                <p><strong>Precio:</strong> Q{productoSeleccionado.precio}</p>
                <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>
            </div>

            {/* Campos de entrada para realizar la compra */}
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
            <input
                type="number"
                placeholder="Cantidad"
                value={cantidad} // Mostrar el valor actual de cantidad
                onChange={(e) => setCantidad(e.target.value)} // Permitir cambiar la cantidad
                required
            />
            <button type="submit">Comprar</button>
        </form>
    );
};

export default Purchase;
