import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import VehiculoService from '../services/VehiculoService';
import TitularService from '../services/TitularService'

function VehiculoForm(){

    const [vehiculo, setVehiculo] = useState({
        patente: "",
        marca: "",
        modelo: "",
        anio: "",
        version: "",
        tipo: "AUTO",
        titular: null,
        fechaIngreso:""
    })

    const [listaTitulares, setListaTitulares] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        TitularService.obtenerTodos()
                        .then(res => {
                            setListaTitulares(res.data)
                        })
                        .catch(error => {
                            console.error("Error al cargar titulares", error)
                        })
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;

        setVehiculo({...vehiculo, [name]:value})
    }

    
    const handleTitularSelect = (e) => {
        const idSeleccionado = e.target.value;

        if (!idSeleccionado){
            setVehiculo({...vehiculo, titular:null})
        } else {
        setVehiculo({
            ...vehiculo, titular:{id:idSeleccionado}
        })}
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vehiculo.titular || !vehiculo.titular.id){
            alert("Por favor, selecciona un Titular de la lista.")
            return
        }

        try {
            const datosAEnviar = {...vehiculo}
            if (!datosAEnviar.fechaIngreso){
                datosAEnviar.fechaIngreso == null
            }

            await VehiculoService.guardar(datosAEnviar);
            alert("Vehiculo guardado con éxito!");
            navigate("/");
        } catch (error) {
            console.error(error)
            alert("Error al guardar: " + (error.response?.data || "Verifica los datos ingresados."))
        }
    }



    return (

        <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <Link to={"/"} style={{justifyContent:"right"}}>Volver</Link>
            <h2>Nuevo Vehículo</h2>
            <form onSubmit={handleSubmit}>
                <h3>Datos del Vehículo</h3>
                {/* Patente */}
                <div>
                    <label>Patente: </label>
                    <input 
                        type="text"
                        name="patente"
                        value={vehiculo.patente}
                        onChange={handleChange}
                        required
                        maxLength='7'
                        style={{ width: "100%", padding: "8px"}} 
                    />
                </div>

                {/* Marca */}
                <div>
                    <label>Marca:</label>
                    <input 
                        type="text"
                        name="marca"
                        value={vehiculo.marca}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px"}} 
                    />
                </div>

                {/* Modelo */}
                <div>
                    <label>Modelo:</label>
                    <input 
                        type="text"
                        name='modelo'
                        value={vehiculo.modelo}
                        onChange={handleChange} 
                        required
                        style={{ width: "100%", padding: "8px"}} 
                    />
                </div>

                {/* Año */}
                <div>
                    <label>Año:</label>
                    <input 
                        type="number"
                        name="anio"
                        value={vehiculo.anio}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px"}}  
                    />
                </div>

                {/* Version */}
                <div>
                    <label>Version:</label>
                    <input 
                        type="text"
                        name="version"
                        value={vehiculo.version}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px"}}  
                    />
                </div>

                {/* Tipo */}
                <div>
                    <label>Tipo:</label>
                    <select 
                        name="tipo"
                        value={vehiculo.tipo}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px"}} 
                        
                    >
                        <option value="">--- Seleccione un Tipo ---</option>
                        <option value="SEDAN_2P">Sedan 2P</option>
                        <option value="SEDAN_3P">Sedan 3P</option>
                        <option value="SEDAN_4P">Sedan 4P</option>
                        <option value="SEDAN_5P">Sedan 5P</option>
                        <option value="RURAL_5P">Rural 5P</option>
                        <option value="SUV">Suv</option>
                        <option value="PICKUP_CABINA_SIMPLE">Pick-up Cabina Simple</option>
                        <option value="PICKUP_CABINA_DOBLE">Pick-up Cabina Doble</option>
                        <option value="FURGON">Furgón</option>
                        <option value="TODO_TERRENO">Todo Terreno</option>
                        <option value="CAMION">Camión</option>
                        <option value="TRANSPORTE_DE_PASAJEROS">Transporte de Pasajeros</option>
                        <option value="OTRO">Otro</option>

                    </select>

                </div>

                {/* Fecha de Ingreso */}
                <div>
                    <label>Fecha de Ingreso:</label>
                    <input 
                        type="date"
                        name="fechaIngreso"
                        value={vehiculo.fechaIngreso}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px"}} 
                    />
                </div>

                {/* Titular */}
                <div style={{ display: 'flex', alignItems: 'end', gap: '10px', margin: '20px 0'}}>
                    <div>
                        <label>Titular:</label>
                        <select 
                            onChange={handleTitularSelect} 
                            style={{flex: 1, padding: '5px'}}
                            defaultValue=""
                        >

                        <option value="">--- Seleccione un Titular ---</option>
                        {listaTitulares.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.apellido}, {t.nombre} - DNI: {t.dni}
                            </option>
                        ))}
                        </select>
                    </div>

                    <button 
                        type='button'
                        onClick={() => navigate("/crear-titular")}
                        style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer",  margin: '20px 0' }}
                    >
                        Nuevo Titular
                    </button>

                </div>

                <button type='submit' style={{padding: "10px 20px", cursor:"pointer"}}>
                    Guardar Vehículo
                </button>

            </form>

        </div>

    )
}


export default VehiculoForm;