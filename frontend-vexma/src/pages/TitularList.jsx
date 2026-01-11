import {useState, useEffect} from "react";
import TitularService from "../services/TitularService";
import {FaEdit, FaEye, FaTrash, FaMoneyBillWave, FaUndo, FaFileArchive} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


function TitularList(){

    const [titulares, setTitulares] = useState([])

    const cargarTitulares = () => {

        TitularService.obtenerTodos()
                        .then(res => {
                            setTitulares(res.data)
                            console.log("Datos recibidos: ", res)
                        })
                        .catch(err => console.log("Error al cargar los titulares: ", err))

    }

    useEffect(() => {
        cargarTitulares()
    }, [])

    const navigate = useNavigate()

    const handleVolver = () => {
        navigate("/")
    }


    const borrarTitular = (id) => {
        if(window.confirm("Esta seguro que desea borrar el titular?")){
            TitularService.borrar(id)
                            .then(() => cargarTitulares())
                            .catch(err => {
                                alert("Error al eliminar el titular: posee vehículos a su nombre.")
                                console.error(err)
                            })
        }
    } 


    return(
        <div className="container">
            <h2>Listado de Titulares</h2>

            <button onClick={handleVolver}>Volver</button>

            <Link to='/crear-titular'>
                <button style={{marginBottom:"10px"}}>Nuevo titular</button>    
            </Link>
        
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {titulares.map(titular => (
                        <tr key={titular.id} style={{ textAlign:"center"}}>
                            <td>{titular.dni}</td>
                            <td>{titular.apellido}</td>
                            <td>{titular.nombre}</td>
                            <td>{titular.fechaNacimiento}</td>

                            <td>
                                {/*Editar*/}
                                <Link to={`/titulares/${titular.id}/editar`}>
                                    <button style={{marginRight:"5px"}} title="Editar titular">
                                        <FaEdit color='#5d8bffff'/>
                                    </button>
                                </Link>

                                {/*Borrar*/}
                                <button onClick={() => borrarTitular(titular.id)} style={{marginRight:"5px"}} title="Borrar titular">
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

export default TitularList