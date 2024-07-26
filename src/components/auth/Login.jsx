import React from "react";

const Login = () => {
  const leerDatos = () => {};
  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      <div className="contenedor-formulario">
        <form>
          <div className="campo">
            <label htmlFor="">Correo:</label>
            <input
              type="email"
              name="email"
              id=""
              required
              onChange={leerDatos}
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
              onChange={leerDatos}
              placeholder=""
            />
          </div>
          <input type="submit" value="Ingresar" className="btn btn-verde btn-block" />
        </form>
      </div>
    </div>
  );
};

export default Login;
