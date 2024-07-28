import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import clienteAxios from "../../config/axios.js";

import { Link } from "react-router-dom";
import Cliente from "./Cliente.jsx";
import Spinner from "../layout/loading/Spinner.jsx";
import { AuthContext } from "../../context/context.jsx";
import Swal from "sweetalert2";

const Clientes = () => {
  const navigate = useNavigate();
  //manejo de estado para auth
  const [auth, setAuth] = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);

  const consultaAPI = async () => {
    try {
      const clientesQuery = await clienteAxios.get("/clientes", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setClientes(clientesQuery.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          navigate("/iniciar-sesion");
        } else {
          Swal.fire({ icon: "error", title: "Error desconocido" });
          navigate("/iniciar-sesion");
        }
      }
    }
  };

  useEffect(() => {
    if (auth.token) {
      consultaAPI();
    } else {
      navigate("/iniciar-sesion");
    }
  }, [clientes, auth.token]);

  useEffect(() => {
    if (!auth.auth) navigate("/iniciar-sesion");
  }, []);

  if (!clientes.length) return <Spinner />;
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
