import React from "react";
import { useState } from "react";
import clienteAxios from "../../config/axios";

const NuevoCliente = () => {
  const [clienteData, setClienteData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    correo: "",
    telefono: "",
  });

  //actualiza el objeto clienteData cuando se introduce informacion en este
  const handleChange = (e) => {
    setClienteData({
      ...clienteData,
      [e.target.name]: e.target.value,
    });
  };

  //solicitud post a la api con axios
  const handleSubmit = (e) => {
    e.preventDefault();

    clienteAxios.post("/clientes", clienteData).then((res) => {
      if (res.data.code === 11000) {
        console.log("Error de duplicado");
      } else {
        console.log(res.data);
      }
    });
  };

  //valida que no haya campos vacios
  const validarCliente = () => {
    const { nombre, apellido, empresa, correo, telefono } = clienteData;

    let valido =
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !correo.length ||
      !telefono.length;

    return valido;
  };
  return (
    <>
      <h2>Nuevo cliente</h2>
      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="correo"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={handleChange}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};

export default NuevoCliente;
