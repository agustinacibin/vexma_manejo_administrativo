import {useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import TitularService from '../services/TitularService'

function TitularForm() {

    const [titular, setTitular] = useState({
        dni: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: ""
    })

    const navigate = useNavigate();

    const {id} = useParams()

    useEffect(() => {
        if (id) {
            TitularService.obtenerPorId(id)
                            .then(res => {
                                const data = res.data

                                setTitular({
                                    ...data
                                })
                            })
                            .catch(err => console.error(err))

        }
    }, [id])


    const handleChange = (e) => {
        const {name, value} = e.target;

        setTitular({...titular, [name]:value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{ 

            if (id) {
                await TitularService.actualizar(titular)
                alert("Titular actualizado con éxito!")
                navigate("/titulares")
            } else {
                await TitularService.guardar(titular);
                alert("Titular guardado con éxito!");
                navigate(-1);
            }
         
            
        } catch(error) {
            console.error(error)
            alert("Error al " + (id ? "guardar" : "actualizar") + " el titular.")
            console.error(error)
        }
    }


    const handleVolver = () => {
        navigate(-1); // Navega un paso atrás en el historial
    }


    return (

        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                
            { 
                id ? (
                    <Link to={"/titulares"}>Volver</Link>
                ) : (
                    <button onClick={handleVolver}>Volver</button>
                ) 

            }    
            <h2>Nuevo Titular</h2>
            <form onSubmit={handleSubmit}>
                <h3>Datos del Titular</h3>

                {/* Nombre */}
                <div>
                    <label>Nombre: </label>
                    <input
                        type="text"
                        name='nombre'
                        value={titular.nombre}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", textTransform: "capitalize"}} 
                    />
                </div>

                {/* Apellido */}
                <div>
                    <label>Apellido: </label>
                    <input
                        type="text"
                        name='apellido'
                        value={titular.apellido}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", textTransform: "capitalize"}} 
                    />
                </div>

                {/* DNI */}
                <div>
                    <label>DNI: </label>
                    <input 
                        type="numeric"
                        name="dni"
                        value={titular.dni}
                        onChange={handleChange}
                        required
                        maxLength="8"
                        minLength="8"
                        style={{ width: "100%", padding: "8px"}}
                    />
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                    <label>Fecha de Nacimiento: </label>
                    <input
                        type="date"
                        name='fechaNacimiento'
                        value={titular.fechaNacimiento}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px"}}
                    />
                </div>

                <button type='submit' style={{padding: "10px 20px", cursor:"pointer"}}>
                    Guardar Titular
                </button>

            </form>

        </div>
    )
}

export default TitularForm;











