import {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DocumentacionService from '../services/DocumentacionService'


function VehiculoDocumentacion() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [formulario, setFormulario] = useState({
        formulario08: false,
        cedulaVerde: false,
        titulo: false,
        verificacionPolicial: false,
        informeDominioRnpa: false,
        informeMultasRnpa: false,
        estadoImpositivo: false,
        manuales: false,
        duplicadoLlaves: false,
        itv: false,
        vehiculo: {id: ""}
    })

    const cargarDocumentos = async () => {
        DocumentacionService.obtenerPorId(id)
                            .then(res => setFormulario(res.data))
                            .catch(err => console.error("Error al cargar los documentos", err))
    }

    useEffect(() => {
        cargarDocumentos()
    }, [id])

    const handleChange = (e) => {
        const {name, checked} = e.target

        setFormulario({
            ...formulario, 
            [name]: checked
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!id){
            alert("Error: No se identificó el vehículo.")
            return
        }

        const payload = {
            ...formulario,
            vehiculo: {id: Number(id)}
        }

        // Datos que se envían al back
        console.log("Datos enviados al backend:", payload);

        try {
            await DocumentacionService.guardar(payload)
            alert("Documentacion actualizada correctamente")
            navigate(`/vehiculos/${id}`)
        } catch (error) {
            console.error("Error al guardar", error)
            alert("Error al guardar: " + (error.response?.data || error.message));
        }



        

    }



    return (

        <div className='container'>

            <Link to={`/vehiculos/${id}`}>
                <button style={{marginBottom:"10px"}}>Volver al Vehiculo</button>
            </Link>

            <h2>Documentación</h2>

            <form onSubmit={handleSubmit}>

                {/* Formulario 08 */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='formulario08'
                            checked={formulario.formulario08}
                            onChange={handleChange} 
                        />Formulario 08
                    </label>
                </div>

                {/* Cédula Verde */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='cedulaVerde'
                            checked={formulario.cedulaVerde}
                            onChange={handleChange} 
                        />Cédula Verde
                    </label>
                </div>

                {/* Título del Automotor */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='titulo'
                            checked={formulario.titulo}
                            onChange={handleChange} 
                        />Título del Automotor
                    </label>
                </div>

                {/* Verificación Policial */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='verificacionPolicial'
                            checked={formulario.verificacionPolicial}
                            onChange={handleChange} 
                        />Verificación Policial
                    </label>
                </div>

                {/* Informe de Dominio - RNPA */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='informeDominioRnpa'
                            checked={formulario.informeDominioRnpa}
                            onChange={handleChange} 
                        />Informe de Dominio - RNPA
                    </label>
                </div>

                {/* Informe de Multas - RNPA */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='informeMultasRnpa'
                            checked={formulario.informeMultasRnpa}
                            onChange={handleChange} 
                        />Informe de Multas - RNPA
                    </label>
                </div>

                {/* Estado Impositivo */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='estadoImpositivo'
                            checked={formulario.estadoImpositivo}
                            onChange={handleChange} 
                        />Estado Impositivo
                    </label>
                </div>

                {/* Manuales */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='manuales'
                            checked={formulario.manuales}
                            onChange={handleChange} 
                        />Manuales
                    </label>
                </div>

                {/* Duplicado de Llaves */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='duplicadoLlaves'
                            checked={formulario.duplicadoLlaves}
                            onChange={handleChange} 
                        />Duplicado de Llaves
                    </label>
                </div>

                {/* ITV */}
                <div>
                    <label className='grupo-check'>
                        <input 
                            type="checkbox"
                            name='itv'
                            checked={formulario.itv}
                            onChange={handleChange} 
                        />ITV
                    </label>
                </div>

                <button type='submit'>Guardar Cambios</button>


            </form>




        </div>


    )
}


export default VehiculoDocumentacion