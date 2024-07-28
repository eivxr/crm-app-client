import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//componentes
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";

import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";

import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";

import Pedidos from "./components/pedidos/Pedidos";
import NuevoPedido from "./components/pedidos/NuevoPedido";
import Login from "./components/auth/Login";

import { context, contextProvider } from "./context/context.jsx";

function App() {
  const [auth, setAuth] = useContext(context);

  return (
    <>
      <contextProvider value={[auth, setAuth]}>
        <BrowserRouter>
          <Header />
          <div className="grid contenedor contenido-principal">
            <NavBar />
            <main className="caja-contenido col-9">
              {/* //ROUTER */}
              <Routes>
                <Route exact path="/" element={<Clientes />} />
                <Route
                  exact
                  path="/clientes/nuevo"
                  element={<NuevoCliente />}
                />
                <Route
                  exact
                  path="/clientes/editar/:id"
                  element={<EditarCliente />}
                />

                <Route exact path="/productos" element={<Productos />} />
                <Route
                  exact
                  path="/productos/nuevo"
                  element={<NuevoProducto />}
                />
                <Route
                  exact
                  path="/productos/editar/:id"
                  element={<EditarProducto />}
                />

                <Route exact path="/pedidos" element={<Pedidos />} />
                <Route
                  exact
                  path="/pedidos/nuevo/:id"
                  element={<NuevoPedido />}
                />

                <Route exact path="/iniciar-sesion" element={<Login />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </contextProvider>
    </>
  );
}

export default App;
