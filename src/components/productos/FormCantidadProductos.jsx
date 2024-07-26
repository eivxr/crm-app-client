import React from "react";

const FormCantidadProductos = ({
  producto,
  restar,
  sumar,
  index,
  eliminar,
}) => {
  return (
    <li>
      <div className="texto-producto">
        <p className="nombre">{producto.nombre}</p>
        <p className="precio">${producto.precio}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i className="fas fa-minus" onClick={() => restar(index)}></i>
          <p>{producto.cantidad}</p>
          <i className="fas fa-plus" onClick={() => sumar(index)}></i>
        </div>
        <button
          type="button"
          className="btn btn-rojo"
          onClick={() => eliminar(producto._id)}
        >
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
};

export default FormCantidadProductos;
