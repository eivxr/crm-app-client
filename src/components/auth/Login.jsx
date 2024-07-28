import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const Login = () => {
  const [datos, setDatos] = useState({});
  const navigate = useNavigate();

  //almacenamos en datos lo que el usuario escribe (credenciales).
  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await clienteAxios.post("/iniciar-sesion", datos);

      //etraccion del token y colocacion en almacenamiento local
      const { token } = res.data;
      localStorage.setItem("token", token);
      Swal.fire("Correcto", "Has iniciado sesión", "info");
      navigate('/')
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.mensaje,
      });
    }
  };

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      <div className="contenedor-formulario">
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="">Correo:</label>
            <input
              type="email"
              name="email"
              id=""
              required
              onChange={handleChange}
              placeholder="Correo electrónico"
            />
          </div>

          <div className="campo">
            <label htmlFor="">Contraseña:</label>
            <input
              type="password"
              name="password"
              id=""
              required
              onChange={handleChange}
              placeholder=""
            />
          </div>
          <input
            type="submit"
            value="Ingresar"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
