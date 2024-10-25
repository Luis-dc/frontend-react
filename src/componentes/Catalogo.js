import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductosCard from './ProductosCard';
import { useCarrito } from '../context/CarritoContext'; // Asegúrate de importar useCarrito

const Catalogo = ({ onSelectProduct }) => {
    const [productos, setProductos] = useState([]);
    const { agregarAlCarrito } = useCarrito(); // Usa el contexto del carrito

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://18.219.186.24:3000/api/data'); // Cambia a tu IP pública
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center my-4">Catálogo de Productos</h1>
            <div className="row">
                {productos.map(producto => (
                    <div key={producto.id_producto} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                        <ProductosCard 
                            producto={producto} 
                            //onSelect={() => onSelectProduct(producto)} 
                            onAgregar={() => agregarAlCarrito(producto)} // Agregar al carrito
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalogo;
