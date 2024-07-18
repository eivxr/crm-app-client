import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const Producto = ({ producto }) => {
  const { _id, image, nombre, precio } = producto;

  const handleDeleteProducto = async (idPrdocuto) => {
    Swal.fire({
      title: "¿Seguro que quiere eliminar este roducto?",
      text: "No podrá ser recuperado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar.",
      cancelButtonText: "No.",
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/productos/${idPrdocuto}`).then((res) => {
          if (res.status === 2000) {
            Swal.fire({
              title: "Eliminado correctamente.",
              text: res.data.mensaje,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">${precio} </p>
        {image ? <img src={`http://localhost:5000/uploads/${image}`} /> : null}
      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button
          type="button"
          onClick={() => handleDeleteProducto(_id)}
          className="btn btn-rojo btn-eliminar"
        >
          <i className="fas fa-times"></i>
          Eliminar producto
        </button>
      </div>
    </li>
  );
};

export default Producto;
