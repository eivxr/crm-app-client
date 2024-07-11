import { useEffect, useState } from "react";

import clienteAxios from "../../config/axios.js";

import { Link } from "react-router-dom";
import Cliente from "./Cliente.jsx";

const Clientes = () => {
  //manejo de estado
  const [clientes, setClientes] = useState([]);

  const consultaAPI = async () => {
    const clientesQuery = await clienteAxios.get("/clientes");

    setClientes(clientesQuery.data);
  };

  useEffect(() => {
    consultaAPI();
  }, []);

  return (
    <>
      <h2>Clientes</h2>
      <Link to="clientes/nuevo" className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clientes.map((cliente, index) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </>
  );
};

export default Clientes;