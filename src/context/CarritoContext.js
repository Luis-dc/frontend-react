// CarritoContext.js
import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => [...prev, { ...producto, cantidad: 1 }]);
    };

    const eliminarDelCarrito = (id_producto) => {
        setCarrito((prev) => prev.filter((item) => item.id_producto !== id_producto));
    };

    const actualizarCantidad = (id_producto, cantidad) => {
        setCarrito((prev) =>
            prev.map((item) => {
                if (item.id_producto === id_producto) {
                    const nuevaCantidad = item.cantidad + cantidad;
                    return { ...item, cantidad: Math.max(nuevaCantidad, 0) }; // Asegúrate de que la cantidad no sea negativa
                }
                return item;
            })
        );
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider
            value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, limpiarCarrito }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => useContext(CarritoContext);
