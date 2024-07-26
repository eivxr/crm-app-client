import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import clienteAxios from "../../config/axios.js";
import BuscarProducto from "./BuscarProducto.jsx";
import FormCantidadProductos from "../productos/FormCantidadProductos.jsx";

const NuevoPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const query = async () => {
      const res = await clienteAxios.get(`/clientes/${id}`);
      setCliente(res.data);
    };

    query();

    actualizarTotal();
  }, [productos]);

  const buscarProduco = async (e) => {
    e.preventDefault();
    const consulta = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

    if (consulta.data[0]) {
      let resultado = consulta.data[0];

      resultado.producto = consulta.data[0]._id;
      resultado.cantidad = 0;

      setProductos([...productos, resultado]);
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

  const eliminar = (id) => {
    const array = productos.filter((producto) => producto.producto !== id);
    setProductos(array);
  };
  const restar = (i) => {
    const array = [...productos];

    if (array[i].cantidad === 0) return;

    array[i].cantidad--;

    setProductos(array);
  };

  const sumar = (i) => {
    const array = [...productos];

    array[i].cantidad++;

    setProductos(array);
  };

  const actualizarTotal = () => {
    if (productos.length === 0) {
      setTotal(0);
      return;
    }

    let nuevoTotal = 0;

    productos.map(
      (producto) => (nuevoTotal += producto.cantidad * producto.precio)
    );

    setTotal(nuevoTotal);
  };

  const realizarPedido = async (e) => {

    e.preventDefault();

    //  preparamos el objeto a insertarse en la coleccion de pedidos
    const pedido = {
      cliente: id,
      pedido: productos,
      total: total,
    };

    const query = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);
    console.log(query);

    if (query.status === 200) {
      Swal.fire({
        icon: 'success',
        title:'Agregado',
        text: query.data.mensaje
      })
    } else {
      Swal.fire({
        icon:'error',
        title:'Hubo un error',
        text:'Vuelve a intentarlo'
      })
    }

    navigate('/pedidos')
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
        {productos.map((producto, index) => (
          <FormCantidadProductos
            key={producto.producto}
            producto={producto}
            restar={restar}
            sumar={sumar}
            index={index}
            eliminar={eliminar}
          />
        ))}
      </ul>
      <p className="total">
        Total a pagar<span>${total}</span>
      </p>
      {total > 0 ? (
        <form onSubmit={realizarPedido}>
          <input
            type="submit"
            className="btn btn-verde btn-block"
            value="Realizar Pedido"
          />
        </form>
      ) : null}
    </>
  );
};

export default NuevoPedido;
