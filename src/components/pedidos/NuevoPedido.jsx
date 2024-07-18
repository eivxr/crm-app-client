import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import clienteAxios from "../../config/axios.js";
import BuscarProducto from "./BuscarProducto.jsx";

const NuevoPedido = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const query = async () => {
      const res = await clienteAxios.get(`/clientes/${id}`);
      setCliente(res.data);
    };

    query();
  }, []);

  const buscarProduco = async (e) => {
    e.preventDefault();
    const consulta = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

    if (consulta.data[0]) {
    } else {
      Swal.fire({
        icon: "info",
        title: "No encontrado",
        text: "No hay resultados para esta búsqueda.",
      });
    }
  };

  const leerDatosBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <>
      <h2>Nuevo pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          {cliente.nombre} {cliente.apellido}
        </p>
        <p>{cliente.empresa}</p>
        <p>{cliente.correo}</p>
      </div>

      <BuscarProducto change={leerDatosBusqueda} submit={buscarProduco} />

      <ul className="resumen">
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
      </ul>
      <div className="campo">
        <label>Total:</label>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          readOnly="readonly"
        />
      </div>
      <div className="enviar">
        <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
      </div>
    </>
  );
};

export default NuevoPedido;
