import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import VehiculoService from '../services/VehiculoService'
import ActividadService from '../services/ActividadService'


function VehiculoDetalle() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [vehiculo, setVehiculo] = useState(null)
    const [nuevaActividad, setNuevaActividad] = useState({
        descripcion:"", 
        gasto:"", 
        fecha:"",
        isPendiente:false
    })

    const [descuento, setDescuento] = useState(2)
    const [rentabilidad, setRentabilidad] = useState(15)

    const [showVentaInput, setShowVentaInput] = useState(false)
    const [showReingresoInput, setShowReingresoInput] = useState(false)
    const [fechaVenta, setFechaVenta] = useState("")
    const [fechaReingreso, setFechaReingreso] = useState("")


    const cargarDatosVehiculo = () => {
        VehiculoService.obtenerPorId(id)
                        .then(res => setVehiculo(res.data))
                        .catch(err => console.error("Error al cargar el vehiculo", err))
    } 

    useEffect(() => {
        cargarDatosVehiculo()
    }, [])


    const handleGuardarActividad = async (e) => {
        e.preventDefault()

        if (!nuevaActividad.descripcion) return alert("Descripción requerida.")

        const actividadAEnviar = {
            ...nuevaActividad,
            gasto: parseFloat(nuevaActividad.gasto) || 0,
            fecha: nuevaActividad.fecha || new Date(),
            vehiculo: {id: vehiculo.id}
        }

        try{
            await ActividadService.guardar(actividadAEnviar)
            setNuevaActividad({ descripcion:"", gasto:"", fecha:"", isPendiente:false})
            cargarDatosVehiculo()
        } catch (error) {
            const mensaje = error.response?.data || "Error desconocido";
            alert("Error al guardar actividad: " + mensaje);
        }

    }


    const borrarActividad = async (idActividad) => {
        if(window.confirm("¿Desea borrar la actividad?")) {
            await ActividadService.borrar(idActividad)
            cargarDatosVehiculo()
            navigate()
        }
    }


    const confirmarVenta = async () => {
        const fechaEnviar = fechaVenta || null

        if (fechaEnviar > new Date().getDate()){
            alert("La fecha enviada no puede ser mayor al día de hoy (" + new Date().getDate() + ").")
        }
        
        try {
            await VehiculoService.vender(vehiculo.id, fechaEnviar)
            setShowVentaInput(false)
            setFechaVenta("")
            cargarDatosVehiculo()
        } catch (error) {
            console.error("Detalle del error:", error)
            let mensajeBackend = ""
            
            if (error.response && error.response.data) {
                if (typeof error.response.data === 'string') {
                    mensajeBackend = error.response.data
                } 
                else {
                    mensajeBackend = JSON.stringify(error.response.data)
                }
            } else {
                mensajeBackend = "Error de conexión o desconocido."
            }

            alert("No se pudo vender:\n" + mensajeBackend)
            setFechaVenta("")
        }
    }

     const confirmarReingreso = async () => {
        const fechaEnviar = fechaReingreso || null
        
        if (fechaEnviar > new Date().getDate()){
            alert("La fecha enviada no puede ser mayor al día de hoy (" + new Date().getDate() + ").")
        }
        
        try {
            await VehiculoService.reingresar(vehiculo.id, fechaEnviar)
            setShowReingresoInput(false)
            setFechaReingreso("")
            cargarDatosVehiculo()
        } catch (error) {
            alert("Error al reingresar el vehículo.")
            console.error(error)
            setFechaReingreso("")
        }
    }

    if (!vehiculo) return <div style={{padding:"20px"}}>Cargando datos del vehículo...</div>

    // Gasto Total de actividades NO pendientes
    const gastoTotalCalculado = vehiculo.actividades 
        ? vehiculo.actividades
            .filter(a => !a.isPendiente && a.gasto)
            .reduce((acc, curr) => acc + curr.gasto, 0)
        : 0

    
    const precioMinimoVenta = (vehiculo.precioCompra || 0) + gastoTotalCalculado

    const precioContado = precioMinimoVenta * (1 + (rentabilidad/100))

    const precioDescuentoContado = precioContado * (1-(descuento/100))

    const actividadesCompletadas = vehiculo.actividades?.filter(a => !a.isPendiente) || [];
    const actividadesPendientes = vehiculo.actividades?.filter(a => a.isPendiente) || [];

    //const marca = vehiculo.marca[0].toUpperCase()+vehiculo.marca.substring(1).toLowerCase()
    //const modelo = vehiculo.modelo[0].toUpperCase()+vehiculo.modelo.substring(1).toLowerCase()

    return (

        <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px", fontFamily: "Arial" }}>
            <Link to='/'> Volver al Listado </Link>

            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #333", marginBottom: "20px" }}>
                <h1>{vehiculo.marca[0].toUpperCase()}{vehiculo.marca.substring(1).toLowerCase()} {vehiculo.modelo[0].toUpperCase()}{vehiculo.modelo.substring(1).toLowerCase()} <small>({vehiculo.anio})</small></h1>
                <h2 style={{ color: "blue" }}>{vehiculo.patente}</h2>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                
                {/* Datos y Actividades */}
                <div>
                    <div style={cardStyle}>
                        <h3>Datos Generales</h3>
                        <p><strong>Versión:</strong> {vehiculo.version[0].toUpperCase()}{vehiculo.version.substring(1).toLowerCase()}</p>
                        <p><strong>Tipo:</strong> {vehiculo.tipo[0]}{vehiculo.tipo.substring(1).toLowerCase().replace("_", " ")}</p>
                        <p><strong>Estado:</strong> {vehiculo.isNuevo ? "Nuevo 0km" : "Usado"}</p>
                        <p><strong>Titular:</strong> {vehiculo.titular ? `${vehiculo.titular.apellido}, ${vehiculo.titular.nombre} - DNI:${vehiculo.titular.dni}` : "Sin titular"}</p>
                        <p><strong>Ingreso:</strong> {vehiculo.fechaIngreso}</p>
                        {vehiculo.fechaEgreso && <p style={{color:"red", fontWeight:"bold"}}>Vendido el: {vehiculo.fechaEgreso}</p>}
                        
                        <div style={{marginTop: "10px"}}>
                            {!vehiculo.fechaEgreso ? (
                                
                                !showVentaInput ? (
                                    <button 
                                        onClick={() => setShowVentaInput(true)} 
                                        style={{...btnStyle, background: "green"}}
                                    >
                                        VENDER
                                    </button>
                                ) : (
                                    <div style={{background: "#e8f5e9", padding: "10px", borderRadius: "5px", border: "1px solid green"}}>
                                        <p style={{margin:"0 0 5px 0", fontSize:"0.9em"}}>Fecha de Venta (Vacío = Hoy):</p>
                                        <div style={{display: "flex", gap: "5px"}}>
                                            <input 
                                                type="date" 
                                                value={fechaVenta}
                                                onChange={(e) => setFechaVenta(e.target.value)}
                                                style={{flex: 1, padding: "5px"}}
                                            />
                                            <button onClick={confirmarVenta} style={{cursor:"pointer", background:"green", color:"white", border:"none", padding:"5px 10px", borderRadius:"3px"}}>OK</button>
                                            <button onClick={() => setShowVentaInput(false)} style={{cursor:"pointer", background:"gray", color:"white", border:"none", padding:"5px 10px", borderRadius:"3px"}}>X</button>
                                        </div>
                                    </div>
                                )
                            ) : (

                                !showReingresoInput ? (
                                    <button 
                                        onClick={() => setShowReingresoInput(true)} 
                                        style={{...btnStyle, background: "orange"}}
                                    >
                                        REINGRESAR
                                    </button>
                                ) : (
                                    <div style={{background: "#e8f5e9", padding: "10px", borderRadius: "5px", border: "1px solid orange"}}>
                                        <p style={{margin:"0 0 5px 0", fontSize:"0.9em"}}>Fecha de Reingreso (Vacío = Hoy):</p>
                                        <div style={{display: "flex", gap: "5px"}}>
                                            <input 
                                                type="date" 
                                                value={fechaReingreso}
                                                onChange={(e) => setFechaReingreso(e.target.value)}
                                                style={{flex: 1, padding: "5px"}}
                                            />
                                            <button onClick={confirmarReingreso} style={{cursor:"pointer", background:"orange", color:"white", border:"none", padding:"5px 10px", borderRadius:"3px"}}>OK</button>
                                            <button onClick={() => setShowReingresoInput(false)} style={{cursor:"pointer", background:"gray", color:"white", border:"none", padding:"5px 10px", borderRadius:"3px"}}>X</button>
                                        </div>
                                    </div>
                                )
                                
                            )}
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3>Actividades</h3>
                        
                        {/* Formulario para agregar actividad */}
                        <form onSubmit={handleGuardarActividad} style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                            <input 
                                placeholder="Descripción" 
                                name="descripcion"
                                value={nuevaActividad.descripcion}
                                onChange={e => setNuevaActividad({...nuevaActividad, descripcion: e.target.value})}
                                style={{width: "60%", marginRight: "5px"}}
                            />
                            <input 
                                type="number" placeholder="$ Costo" 
                                name="gasto"
                                min={0}
                                value={nuevaActividad.gasto}
                                onChange={e => setNuevaActividad({...nuevaActividad, gasto: e.target.value})}
                                style={{width: "20%", marginRight: "5px"}}
                            />
                            <br />
                            <label style={{color:'black'}}>
                                <input 
                                    type="checkbox" 
                                    checked={!nuevaActividad.isPendiente}
                                    onChange={e => setNuevaActividad({...nuevaActividad, isPendiente: !e.target.checked})}
                                /> Completada
                            </label>
                            <button type="submit" style={{float: "right", cursor: "pointer"}}>+ Agregar</button>
                        </form>

                        {/* Lista de Actividades */}
                        {/* Realizadas */}
                        <h4 style={{ borderBottom: "2px solid green", paddingBottom: "5px", marginBottom: "10px", color: "green" }}>
                            Realizadas ({actividadesCompletadas.length})
                        </h4>
                        
                        {actividadesCompletadas.length > 0 ? (
                            <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
                                {actividadesCompletadas.map(act => (
                                    <li key={act.id} style={{ borderBottom: "1px solid #eee", padding: "8px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{color: "#333"}}>
                                            {act.descripcion}
                                        </span>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <strong style={{marginRight: "10px"}}>${act.gasto}</strong>
                                            <button 
                                                onClick={() => borrarActividad(act.id)} 
                                                style={{color: "red", border: "1px solid red", borderRadius: "4px", background: "white", cursor: "pointer", padding: "2px 6px", fontSize: "0.8em"}}
                                                title="Eliminar"
                                            >
                                                X
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ fontStyle: "italic", color: "#888", fontSize: "0.9em" }}>No hay actividades realizadas.</p>
                        )}


                        {/* Pendientes */}
                        <h4 style={{ borderBottom: "2px solid orange", paddingBottom: "5px", marginBottom: "10px", color: "#e67e22", marginTop: "20px" }}>
                            Pendientes ({actividadesPendientes.length})
                        </h4>

                        {actividadesPendientes.length > 0 ? (
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {actividadesPendientes.map(act => (
                                    <li key={act.id} style={{ borderBottom: "1px solid #eee", padding: "8px 0", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff8e1" }}>
                                        <span style={{color: "#555"}}>
                                            {act.descripcion}
                                        </span>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <strong style={{marginRight: "10px", color: "#e67e22"}}>${act.gasto}</strong>
                                            <button 
                                                onClick={() => borrarActividad(act.id)} 
                                                style={{color: "red", border: "1px solid red", borderRadius: "4px", background: "white", cursor: "pointer", padding: "2px 6px", fontSize: "0.8em"}}
                                                title="Eliminar"
                                            >
                                                X
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ fontStyle: "italic", color: "#888", fontSize: "0.9em" }}>No hay pendientes.</p>
                        )}
                    </div>
                </div>

                {/* Precios */}
                <div>
                    <div style={{...cardStyle, width:"400px", backgroundColor: "#f9fff9", borderColor: "green", color:"black"}}>
                        <h3>Precios del Vehículo</h3>
                        
                        <div style={rowStyle}>
                            <span>Precio Compra:</span>
                            <strong>$ {vehiculo.precioCompra}</strong>
                        </div>
                        <div style={rowStyle}>
                            <span>+ Gastos Totales:</span>
                            <strong>$ {gastoTotalCalculado}</strong>
                        </div>
                        <hr />
                        <div style={rowStyle}>
                            <span>Precio de Costo:</span>
                            <strong>$ {precioMinimoVenta}</strong>
                        </div>
                        
                        <br />
                        
                        <div style={rowStyle}>
                            <span>Precio de Lista:</span>
                            <strong style={{fontSize: "1.2em"}}>$ {vehiculo.precioLista}</strong>
                        </div>

                        <div style={{...rowStyle, background: "#eee", padding: "5px", borderRadius: "5px", marginTop: "10px"}}>
                            <span>Rentabilidad (%):</span>
                            <input 
                                type="number" 
                                value={rentabilidad} 
                                onChange={(e) => setRentabilidad(e.target.value)}
                                style={{width: "50px", textAlign: "center"}}
                            />
                        </div>

                        <div style={{...rowStyle, textAlign:"center", marginTop: "10px", color: "green"}}>
                            <span style={{fontSize: "1.2em"}}>Precio: 
                            <strong style={{fontSize: "1.5em"}}> $ {precioContado.toFixed(2)}</strong></span>
                        </div>

                        <div style={rowStyle}>
                            <span>Precio de Contado:<br/>
                            <strong>$ {precioDescuentoContado.toFixed(2)}</strong></span>
                            <div  style={{...rowStyle, background: "#eee", padding: "5px", borderRadius: "5px", marginTop: "10px"}}>
                                <span>Descuento (%):</span>
                                <input 
                                    type="number" 
                                    value={descuento} 
                                    onChange={(e) => setDescuento(e.target.value)}
                                    style={{width: "50px", textAlign: "center"}}
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </div>









        </div>

    )



}

const cardStyle = { border: "1px solid #ddd", borderRadius: "8px", padding: "15px", marginBottom: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" };
const rowStyle = { display: "flex", justifyContent: "space-between", marginBottom: "5px" };
const btnStyle = { padding: "10px 20px", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%", fontWeight: "bold" };


export default VehiculoDetalle