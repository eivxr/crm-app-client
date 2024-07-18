import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
const Cliente = ({ cliente }) => {
  const { _id, nombre, apellido, empresa, correo, telefono } = cliente;

  //eliminar un cliente
  const handleDeleteCliente = async (idCliente) => {
    Swal.fire({
      title: "¿Seguro que quiere eliminar este cliente?",
      text: "No podrá ser recuperado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar.",
      cancelButtonText: "No.",
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/clientes/${idCliente}`).then((res) => {
          Swal.fire({
            title: "Eliminado correctamente.",
            text: res.data.mensaje,
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="empresa">{empresa}</p>
        <p>{correo}</p>
        <p>Tel: {telefono}</p>
      </div>
      <div className="acciones">
        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo pedido
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => handleDeleteCliente(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};

export default Cliente;
