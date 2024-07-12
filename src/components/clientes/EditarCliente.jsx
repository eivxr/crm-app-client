import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import clienteAxios from "../../config/axios";

const EditarCliente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [clienteData, setClienteData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    correo: "",
    telefono: "",
  });

  //consulta el cliente por medio de id
  const clienteQuery = async () => {
    try {
      const cliente = await clienteAxios.get(`/clientes/${id}`);
      setClienteData(cliente.data);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo obtener el cliente",
      });
    }
  };

  useEffect(() => {
    clienteQuery();
  }, []);
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

    clienteAxios.put(`/clientes/${id}`, clienteData).then((res) => {
      if (res.data.code === 11000) {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Ese cliente ya ha sido registrado",
        });
      } else {
        console.log(res.data);
        Swal.fire({
          title: "Cambios realizados",
          text: "Cliente actualizado correctamente",
          icon: "success",
        });
      }

      navigate("/");
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
            value={clienteData.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={handleChange}
            value={clienteData.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={handleChange}
            value={clienteData.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="correo"
            onChange={handleChange}
            value={clienteData.correo}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={handleChange}
            value={clienteData.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};

export default EditarCliente;
