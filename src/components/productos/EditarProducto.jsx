import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import clienteAxios from "../../config/axios.js";
import Spinner from "../../components/layout/loading/Spinner.jsx";

const EditarProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    image: "",
  });

  const [archivo, setArchivo] = useState("");

  const query = async () => {
    const productoQuery = await clienteAxios.get(`/productos/${id}`);
    setProducto(productoQuery.data);
  };

  useEffect(() => {
    query();
  }, []);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //es un formulario tipo form-data
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("image", archivo);

    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        Swal.fire({
          title: "Guardado correctamente",
          text: res.data.mensaje,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Vuelve a intentarlo",
      });
    }

    navigate("/productos ");
  };

  const { nombre, precio, image } = producto;
  return (
    <>
      <h2>Editar producto</h2>
      {!nombre ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <legend>Llena todos los campos</legend>

          <div className="campo">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Nombre Producto"
              name="nombre"
              onChange={handleChange}
              defaultValue={nombre}
            />
          </div>

          <div className="campo">
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              min="0.00"
              step="0.01"
              placeholder="Precio"
              onChange={handleChange}
              defaultValue={precio}
            />
          </div>

          <div className="campo">
            <label>Imagen:</label>
            {image ? (
              <img
                src={`http://localhost:5000/uploads/${image}`}
                alt={image}
                width="300"
              />
            ) : (
              null()
            )}
            <input type="file" name="imagen" onChange={handleFile} />
          </div>

          <div className="enviar">
            <input
              type="submit"
              className="btn btn-azul"
              value="Guardar cambios"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default EditarProducto;
