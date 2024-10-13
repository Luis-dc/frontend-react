import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductosCard = ({ producto, onSelect }) => {
    return (
        <div className="card h-100 shadow-sm">
            <img src={producto.imagen_url} className="card-img-top" alt={producto.nombre} />
            <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">Precio: Q{producto.precio}</p>
                <p className="card-text">Stock: {producto.stock}</p>
                {onSelect && ( // Mostrar el botón solo si onSelect está definido
                    <button className="btn btn-primary" onClick={() => onSelect(producto)}>
                        Seleccionar
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductosCard;
