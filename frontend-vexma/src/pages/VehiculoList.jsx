import { useState, useEffect } from "react";
import VehiculoService from "../services/VehiculoService";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaMoneyBillWave,
  FaUndo,
  FaFileArchive,
  FaCar,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/VehiculoList_css.css";

function VehiculoList() {
  const [vehiculos, setVehiculos] = useState([]);

  // Pide toda la lista de vehiculos
  const cargarVehiculos = () => {
    VehiculoService.obtenerTodos()
      .then((respuesta) => {
        setVehiculos(respuesta.data);
        console.log("Datos recibidos: ", respuesta.data);
      })
      .catch((error) => {
        console.error("Error al traer los vehiculos: ", error);
      });
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  // Para borrar algun vehiculo
  const borrarVehiculo = (id) => {
    if (
      window.confirm("¿Seguro que desea borrar permanentemente el vehiculo?")
    ) {
      VehiculoService.borrar(id)
        .then(() => {
          cargarVehiculos();
        })
        .catch((error) => console.error(error));
    }
  };

  const vehiculosActuales = vehiculos.filter((v) => !v.fechaEgreso);
  const vehiculosVendidos = vehiculos.filter((v) => v.fechaEgreso);

  // vista
  return (
    <div className="vehiculo-list-container">
      <div className="vehiculos-agencia">
        <div>
          <p className="vehiculos-agencia-numero">{vehiculos.length}</p>
          <p className="vehiculos-agencia-texto">
            {vehiculos.length > 1 || vehiculos.length == 0
              ? "Vehículos Cargados"
              : "Vehículo Cargado"}
          </p>
        </div>
        <div>
          <p className="vehiculos-agencia-numero">{vehiculosActuales.length}</p>
          <p className="vehiculos-agencia-texto">
            {vehiculosActuales.length > 1 || vehiculosActuales.length == 0
              ? "Vehículos en Agencia"
              : "Vehículo en Agencia"}
          </p>
        </div>
        <div>
          <p className="vehiculos-agencia-numero">{vehiculosVendidos.length}</p>
          <p className="vehiculos-agencia-texto">
            {vehiculosVendidos.length > 1 || vehiculosVendidos.length == 0
              ? "Vehículos Vendidos"
              : " Vehículo Vendido "}
          </p>
        </div>
      </div>

      <div className="vehiculo-datos-lista-divisor"></div>

      <h2>Listado de Vehículos</h2>

      {vehiculos.map((vehiculo) => (
        <div
          key={vehiculo.id}
          className="main-vehicle-container"
          style={
            vehiculo.fechaEgreso
              ? { backgroundColor: "rgba(240, 248, 255, 0.41)" }
              : { opacity: "100%" }
          }
        >
          <div className="vehiculo-container">
            <div
              className="vehiculo-informacion-container"
              style={
                vehiculo.fechaEgreso ? { opacity: "65%" } : { opacity: "100%" }
              }
            >
              <div id="main-car-info">
                <span style={{ whiteSpace: "nowrap" }}>
                  <strong>
                    {vehiculo.marca} {vehiculo.modelo} {vehiculo.version}{" "}
                    {vehiculo.anio}
                  </strong>
                </span>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "30px",
                      width: "1px",
                      backgroundColor: "#99999970",
                    }}
                  ></div>
                </div>

                <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {vehiculo.patente}
                </span>
              </div>
              <div id="car-owner">
                <strong>Titular:</strong>{" "}
                {vehiculo.titular
                  ? vehiculo.titular.apellido + ", " + vehiculo.titular.nombre
                  : "-"}
              </div>
            </div>

            <div className="vehiculo-estado-container">
              <p
                style={
                  vehiculo.fechaEgreso
                    ? { color: "#ff4040" }
                    : { color: "white" }
                }
              >
                {vehiculo.fechaEgreso ? "VENDIDO" : "EN AGENCIA"}
              </p>
            </div>
          </div>

          <div className="acciones-container">
            {/*Ver detalles*/}
            <Link to={`/vehiculos/${vehiculo.id}`}>
              <button style={{ marginRight: "5px" }} title="Ver detalles">
                <FaEye color="rgb(117, 227, 255)" />
              </button>
            </Link>

            {/* Ver Documentación Asociada */}
            <Link to={`/vehiculos/${vehiculo.id}/documentacion`}>
              <button style={{ marginRight: "5px" }} title="Ver documentación">
                <FaFileArchive color="" FaFileArchive />
              </button>
            </Link>

            {/*Borrar*/}
            <button
              onClick={() => borrarVehiculo(vehiculo.id)}
              style={{ marginRight: "5px" }}
              title="Borrar vehículo"
            >
              <FaTrash color="#fd4545" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VehiculoList;
