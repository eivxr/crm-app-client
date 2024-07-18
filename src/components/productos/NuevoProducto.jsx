import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios.js";

const NuevoProducto = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
  });

  const [archivo, setArchivo] = useState("");

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setArchivo(e.target.files[0]);
  };

  //enviar datos y guardar en bd
  const handleSubmit = async (e) => {
    e.preventDefault();

    //es un formulario tipo form-data
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("image", archivo);

    try {
      const res = await clienteAxios.post("/productos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        Swal.fire({
          title: "Agregado correctamente",
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

    navigate('/productos ')
  };

  return (
    <>
      <h2>Nuevo producto</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={handleChange}
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
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={handleFile} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </>
  );
};

export default NuevoProducto;
