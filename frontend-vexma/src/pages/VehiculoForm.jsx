import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import VehiculoService from '../services/VehiculoService';
import TitularService from '../services/TitularService';
import TitularModal from './TitularModal';

function VehiculoForm(){

    const [vehiculo, setVehiculo] = useState({
        patente: "",
        marca: "",
        modelo: "",
        anio: "",
        version: "",
        isNuevo:"",
        tipo: "",
        titular: null,
        precioCompra:"",
        precioLista:"",
        fechaIngreso:"",
        fechaEgreso: null
    })

    const [listaTitulares, setListaTitulares] = useState([])

    const [showTitularModal, setShowTitularModal] = useState(false)

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        TitularService.obtenerTodos()
                        .then(res => {
                            setListaTitulares(res.data)
                        })
                        .catch(error => {
                            console.error("Error al cargar titulares", error)
                        })

        
        // En caso de actualizar un vehículo en particular

        if (id) {
            VehiculoService.obtenerPorId(id)
                            .then(res => {
                                const data = res.data

                                setVehiculo({
                                    ...data,
                                    isNuevo: data.isNuevo.toString(),
                                    titular: data.titular || null
                                })
                            })
                            .catch(err => console.error(err))
        }
    }, [id])

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "patente"){
            setVehiculo({...vehiculo, [name]:value.toUpperCase()})
        } else {
            setVehiculo({...vehiculo, [name]:value})
        }

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


    const handleTitularCreado = (nuevoTitular) => {
        setListaTitulares([...listaTitulares, nuevoTitular])
        setVehiculo({...vehiculo, titular: nuevoTitular})
        setShowTitularModal(false)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vehiculo.titular || !vehiculo.titular.id){
            alert("Por favor, selecciona un Titular de la lista.")
            return
        }

        if (vehiculo.isNuevo === "") {
            alert("Por favor, indica si el vehículo es Nuevo o Usado.")
            return
        }

        if(vehiculo.tipo === "") {
            alert("Por favor, selecciona un Tipo de la lista.")
            return
        }

        try {

            const datosAEnviar = {...vehiculo}

            // 2. LIMPIEZA: Borramos las relaciones que confunden al Backend
            delete datosAEnviar.actividades;    // <--- ESTO ES LA CLAVE
            delete datosAEnviar.documentacion;  // <--- ESTO TAMBIÉN

            // 3. Ajuste del Titular (si es necesario)
            // A veces enviar el objeto titular entero da problemas, mejor solo el ID
            if (datosAEnviar.titular && datosAEnviar.titular.id) {
                datosAEnviar.titular = { id: datosAEnviar.titular.id };
            }

            if (!datosAEnviar.fechaIngreso){
                datosAEnviar.fechaIngreso = null
            }

            datosAEnviar.isNuevo = (vehiculo.isNuevo === "true")

            datosAEnviar.precioCompra = parseFloat(vehiculo.precioCompra)
            datosAEnviar.precioLista = parseFloat(vehiculo.precioLista)

            console.log("Enviando al backend:", datosAEnviar);

            if (id) {
                await VehiculoService.actualizar(datosAEnviar)
                alert("Vehiculo actualizado con éxito!")
                navigate(`/vehiculos/${id}`)
            } else {
                await VehiculoService.guardar(datosAEnviar)
                alert("Vehiculo guardado con éxito!")
                navigate("/")
            }

            if(isNaN(datosAEnviar.precioCompra) || isNaN(datosAEnviar.precioLista)){
                alert("Por favor ingresa precios válidos");
                return;
            }

        } catch (error) {
            console.error(error)
            const mensaje = error.response?.data ? JSON.stringify(error.response.data) : "Verifica los datos."
            alert("Error al guardar: " + mensaje)
        }
    }



    return (

        <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            {
                id ? (
                    <Link to={`/vehiculos/${id}`} style={{justifyContent:"right"}}>Volver</Link>
                ) : (
                    <Link to={"/"} style={{justifyContent:"right"}}>Volver</Link>
                )}
            
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
                        style={{ width: "100%", padding: "8px", textTransform: "capitalize"}}
                         
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
                        style={{ width: "100%", padding: "8px", textTransform: "capitalize"}}
                         
                    />
                </div>

                {/* Año */}
                <div>
                    <label>Año:</label>
                    <input 
                        type="number"
                        name="anio"
                        max={new Date().getFullYear()}
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
                        style={{ width: "100%", padding: "8px", textTransform: "capitalize"}}
                          
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
                        <option value="AUTO">--- Seleccione un Tipo ---</option>
                        <option value="SEDAN_2P">Sedan 2P</option>
                        <option value="SEDAN_3P">Sedan 3P</option>
                        <option value="SEDAN_4P">Sedan 4P</option>
                        <option value="SEDAN_5P">Sedan 5P</option>
                        <option value="RURAL_5P">Rural 5P</option>
                        <option value="SUV">Suv</option>
                        <option value="PICKUP_CABINA_SIMPLE">Pick-Up Cabina Simple</option>
                        <option value="PICKUP_CABINA_DOBLE">Pick-Up Cabina Doble</option>
                        <option value="FURGON">Furgón</option>
                        <option value="TODO_TERRENO">Todo Terreno</option>
                        <option value="CAMION">Camión</option>
                        <option value="TRANSPORTE_DE_PASAJEROS">Transporte de Pasajeros</option>
                        <option value="OTRO">Otro</option>

                    </select>

                </div>

                {/* Estado */}
                <div>
                    <label>Estado:</label>
                    <select 
                        name="isNuevo" 
                        value={vehiculo.isNuevo}
                        onChange={handleChange}    
                        style={{ width: "100%", padding: "8px"}} 
                    >
                        <option value="">--- Seleccione un Estado ---</option>
                        <option value="true">Nuevo (0km)</option>
                        <option value="false">Usado</option>

                    </select>
                </div>

                {/* Precio de Compra */}
                <div>
                    <label>Precio de Compra:</label>
                    <input
                        type="number"
                        name='precioCompra'
                        value={vehiculo.precioCompra} 
                        step="any" 
                        min="0"
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px"}} 
                    />
                </div>

                {/* Precio de Lista */}
                <div>
                    <label>Precio de Lista:</label>
                    <input 
                        type="number"
                        name='precioLista'
                        value={vehiculo.precioLista}
                        step="any" 
                        min="0"
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px"}} 
                    />
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
                <label>Titular:</label>
                <div style={{ display: 'flex', gap: '50px', margin: '20px 0'}}>
                    <div>
                        <select 
                            onChange={handleTitularSelect} 
                            style={{flex: 1, padding: '5px'}}
                            value={vehiculo.titular?.id || ""}
                        >

                            <option value="">--- Seleccione un Titular ---</option>
                            {
                                listaTitulares
                                    .sort((a,b) => a.apellido.localeCompare(b.apellido))
                                    .map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.apellido}, {t.nombre} - DNI: {t.dni}
                                        </option>
                                    ))
                            }
                            
                        </select>
                    </div>

                    <button 
                        type='button'
                        //onClick={() => navigate("/crear-titular")}
                        onClick={() => setShowTitularModal(true)}
                        style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer",  borderRadius:"4px", margin: '-0px 0' }}
                    >
                        Nuevo Titular
                    </button>

                </div>

                <button type='submit' style={{padding: "10px 20px", cursor:"pointer"}}>
                    Guardar Vehículo
                </button>

            </form>

            {showTitularModal && (
                <TitularModal
                    onClose={() => setShowTitularModal(false)}
                    onTitularCreado={handleTitularCreado}
                />
            )}

        </div>

    )
}


export default VehiculoForm;