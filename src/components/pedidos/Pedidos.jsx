import React from "react";
import { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import DetallesPedido from "./DetallesPedido";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const request = async () => {
      const query = await clienteAxios.get("/pedidos");
      setPedidos(query.data);
    };

    request();
  }, [pedidos]);

  return (
    <>
      <h2>Pedidos</h2>
      {
        pedidos.length ? 
        <ul className="listado-pedidos">
        {pedidos.map((pedido) => (
          <DetallesPedido key={pedido._id} pedido={pedido} />
        ))}
      </ul> : <h3>No hay pedidos</h3>
      }
      
    </>
  );
};

export default Pedidos;
