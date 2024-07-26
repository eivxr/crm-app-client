import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import clienteAxios from "../../config/axios.js";
import Producto from "./Producto.jsx";
import Spinner from "../layout/loading/Spinner.jsx";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = async () => {
    try {
      const productosQuery = await clienteAxios.get("/productos");
      setProductos(productosQuery.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    query();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h2>Productos</h2>  

      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </>
  );
};

export default Productos;
