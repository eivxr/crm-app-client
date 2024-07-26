import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const DetallesPedido = ({ pedido }) => {
  const { cliente, productos } = pedido;

  const eliminarPedido = (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esto no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        clienteAxios
          .delete(`/pedidos/${id}`)
          .then(Swal.fire({ title: "Eliminado correctamente", icon: "info" }));
      }
    });
  };
  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID: {cliente._id}</p>
        <p className="nombre">
          Cliente: {cliente.nombre} {cliente.apellido}
        </p>

        <div className="articulos-pedido">
          <p className="productos">Artículos Pedido: </p>
          <ul>
            {pedido.pedido.map((articulos) => (
              <li key={pedido._id + articulos._id}>
                <p>{articulos.producto.nombre}</p>
                <p>Precio: ${articulos.producto.precio}</p>
                <p>Cantidad: {articulos.producto.cantidad}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="total">Total: ${pedido.total} </p>
      </div>
      <div className="acciones">
        <a href="#" className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Pedido
        </a>

        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarPedido(pedido._id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
};

export default DetallesPedido;
