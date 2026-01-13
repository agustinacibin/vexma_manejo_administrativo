import { useState } from "react";
import TitularService from "../services/TitularService";

function TitularModal({onClose, onTitularCreado}) {

    const [nuevoTitular, setNuevoTitular] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: ""
    })

    const handleChange = (e) => {
        setNuevoTitular({...nuevoTitular, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const res = await TitularService.guardar(nuevoTitular)
            onTitularCreado(res.data)
            alert("Titular creado exitosamente!")
            onClose()
        } catch (err) {
            console.error(err)
            alert("Error al crear titular. Verifique sus datos y si el DNI ya existe.")
        }
    }


    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
                    <h3>Nuevo Titular</h3>
                    <button onClick={onClose} style={{background:'transparent', border:'none', fontSize:'1.2em', cursor:'pointer'}}>❌</button>
                </div>

                <form onSubmit={handleSubmit}>

                    <label>Nombre:</label>
                    <input 
                        type="text"
                        name="nombre"
                        value={nuevoTitular.nombre}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <label>Apellido:</label>
                    <input 
                        type="text"
                        name="apellido"
                        value={nuevoTitular.apellido}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <label>DNI:</label>
                    <input 
                        type="numeric"
                        name="dni"
                        value={nuevoTitular.dni}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <label>Fecha de Nacimiento:</label>
                    <input 
                        type="date"
                        name="fechaNacimiento"
                        value={nuevoTitular.fechaNacimiento}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
                        <button type="submit" style={{...btnStyle, background:'green'}}>Guardar</button>
                        <button type="button" onClick={onClose} style={{...btnStyle, background:'gray'}}>Cancelar</button>
                    </div>


                </form>

            </div>
        
        </div>
    )
}

const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000
}

const modalStyle = {
    backgroundColor: 'white', padding: '20px', borderRadius: '8px',
    color: "black",
    width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}

const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px', display:'block', boxSizing:'border-box', textTransform: "capitalize" }
const btnStyle = { flex: 1, padding: '10px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }

export default TitularModal