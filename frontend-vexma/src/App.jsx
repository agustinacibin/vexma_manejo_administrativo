import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { FaCar, FaUsers, FaPlus, FaFileArchive } from 'react-icons/fa';
import { useState } from "react";
import "./App.css";
import VehiculoList from "./pages/VehiculoList";
import VehiculoForm from "./pages/VehiculoForm";
import TitularForm from "./pages/TitularForm.jsx";
import VehiculoDetalle from "./pages/VehiculoDetalle.jsx";
import VehiculoDocumentacion from "./pages/VehiculoDocumentacion.jsx";
import TitularList from "./pages/TitularList.jsx";

function App() {

  const [agregarNuevo, setAgregarNuevo] = useState(true)
  const [mostrarBoton, setMostrarBoton] = useState(true)

  return (
    <BrowserRouter>
      <div className="header-class">
        <header>VEXMA Management</header>
      </div>

      <div className="app-layout">
        <div className="sidebar-class">
          <nav>
            <ul>
              <li>
                <span style={{marginLeft:"15px", marginBottom:"0px", fontSize:"28px", fontWeight:"500"}}>Menú</span>
                <NavLink to="/"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => {setAgregarNuevo(true), setMostrarBoton(true)}}>
                  <FaCar /> Vehículos
                </NavLink>
              </li>
              <li>
                <NavLink to="/titulares"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => {setAgregarNuevo(false), setMostrarBoton(true)}}>
                  <FaUsers /> Titulares
                </NavLink>
              </li>
              <li>
                <NavLink to="/crear"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => setMostrarBoton(false)}>
                  <FaFileArchive /> Documentación
                </NavLink>
              </li>

              {mostrarBoton && (
                <li id="agregar-contenido-item">
                  {agregarNuevo ? (
                    <NavLink to="/crear"
                      className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaPlus /> Nuevo Vehículo
                    </NavLink>
                  ) : (
                    <NavLink to="/crear-titular"
                      className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaPlus /> Nuevo Titular
                    </NavLink>
                  )}
                  
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div
          className="main-content-container"
          style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
        >
          <Routes>
            <Route path="/" element={<VehiculoList />} />
            <Route path="/crear" element={<VehiculoForm />} />
            <Route path="/vehiculos/:id" element={<VehiculoDetalle />} />
            <Route path="/vehiculos/:id/editar" element={<VehiculoForm />} />
            <Route
              path="/vehiculos/:id/documentacion"
              element={<VehiculoDocumentacion />}
            />
            <Route path="/titulares" element={<TitularList />} />
            <Route path="/crear-titular" element={<TitularForm />} />
            <Route path="/titulares/:id/editar" element={<TitularForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
