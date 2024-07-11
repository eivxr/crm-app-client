import { BrowserRouter, Route, Routes } from "react-router-dom";

//componentes
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import Productos from "./components/productos/Productos";
import Pedidos from "./components/pedidos/Pedido"


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="grid contenedor contenido-principal">
          <NavBar />
          <main className="caja-contenido col-9">
            {/* //ROUTER */}
            <Routes>
              <Route exact path="/" element={<Clientes />} />
              <Route exact path="/clientes/nuevo" element={<NuevoCliente />} />
              <Route exact path="/productos" element={<Productos />} />
              <Route exact path="/pedidos" element={<Pedidos />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
