import {useState, useEffect} from "react";
import VehiculoService from "../services/VehiculoService";
import {FaEdit, FaEye, FaTrash, FaMoneyBillWave, FaUndo, FaFileArchive} from "react-icons/fa";
import { Link } from "react-router-dom";

function VehiculoList(){
    const [vehiculos, setVehiculos] = useState([]);

    // Pide toda la lista de vehiculos
    const cargarVehiculos = () => {
        VehiculoService.obtenerTodos()
                        .then(respuesta => {
                            setVehiculos(respuesta.data);
                            console.log("Datos recibidos: ", respuesta.data);
                        })
                        .catch(error => {
                            console.error("Error al traer los vehiculos: ", error)
                        });
    };

    useEffect(() => {
        cargarVehiculos();
    }, []);


    // Para borrar algun vehiculo
    const borrarVehiculo = (id) => {
        if(window.confirm("¿Seguro que desea borrar permanentemente el vehiculo?")){
            VehiculoService.borrarVehiculo(id)
                            .then(() => {
                                cargarVehiculos();
                            })
                            .catch(error => console.error(error));
        }
    }



    // vista
    return(
        <div className="container">
            <h2>Listado de Vehículos</h2>

            <Link to='/crear'>
                <button style={{marginBottom:"10px"}}>Nuevo vehículo</button>    
            </Link>
        
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Patente</th>
                        <th>Marca | Modelo</th>
                        <th>Año</th>
                        <th>Version</th>
                        <th>Tipo</th>
                        <th>Titular</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map(vehiculo => (
                        <tr key={vehiculo.id} style={{ textAlign:"center"}}>
                            <td>{vehiculo.patente}</td>
                            <td>{vehiculo.marca} {vehiculo.modelo}</td>
                            <td>{vehiculo.anio}</td>
                            <td>{vehiculo.version}</td>
                            <td>{vehiculo.tipo.replace(/_/g, ' ')}</td>
                            <td>{vehiculo.titular ? `${vehiculo.titular.apellido}, ${vehiculo.titular.nombre}` : "-"}</td>

                            <td>
                                {vehiculo.fechaEgreso ? (
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>VENDIDO</span>
                                ) : (
                                    <span style={{ color: 'green', fontWeight: 'bold' }}>EN STOCK</span>
                                )}
                            </td>

                            <td>
                                {/*Ver detalles*/}
                                <Link to={`/vehiculos/${vehiculo.id}`}>
                                    <button style={{marginRight:"5px"}} title="Detalles">
                                        <FaEye color='#5d8bffff'/>
                                    </button>
                                </Link>

                                {/*Vender o reingresar (segun fechaEgreso)*/}
                                {
                                    vehiculo.fechaEgreso == null ? (
                                        <button style={{marginRight:"5px"}} title="Vender">
                                            <FaMoneyBillWave color="green"/>
                                        </button>
                                    ) : (
                                        <button style={{marginRight:"5px"}} title="Reingresar">
                                            <FaUndo color="orange"/>
                                        </button>
                                    )
                                }

                                {/* Ver Documentación Asociada */}
                                <Link to={`/vehiculos/${vehiculo.id}/documentacion`}>
                                    <button style={{marginRight:"5px"}} title="Documentacion">
                                        <FaFileArchive color='' FaFileArchive/>
                                    </button>
                                </Link>


                                {/*Borrar*/}
                                <button onClick={() => borrarVehiculo(vehiculo.id)} style={{marginRight:"5px"}} title="Borrar">
                                    <FaTrash color="red"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        
        </div>
    )


}


export default VehiculoList;


