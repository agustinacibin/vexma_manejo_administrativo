import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DocumentacionService from "../services/DocumentacionService";
import VehiculoService from "../services/VehiculoService";
import "../css/VehiculoDocumentacion-css.css";
import { SlArrowLeft } from "react-icons/sl";

function VehiculoDocumentacion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formulario, setFormulario] = useState({
    id: null,
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
  });

  const itemsDocumentacion = [
    { name: "formulario08", label: "Formulario 08" },
    { name: "cedulaVerde", label: "Cédula Verde" },
    { name: "titulo", label: "Título del Automotor" },
    { name: "verificacionPolicial", label: "Verificación Policial" },
    { name: "informeDominioRnpa", label: "Informe de Dominio - RNPA" },
    { name: "informeMultasRnpa", label: "Informe de Multas - RNPA" },
    { name: "estadoImpositivo", label: "Estado Impositivo" },
    { name: "manuales", label: "Manuales" },
    { name: "duplicadoLlaves", label: "Duplicado de Llaves" },
    { name: "itv", label: "ITV" },
  ];

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (id) {
          const res = await VehiculoService.obtenerPorId(id);
          setVehiculo(res.data);
          
          if (res.data.documentacion) {
            setFormulario(res.data.documentacion);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormulario({ ...formulario, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formulario, vehiculo: { id: Number(id) } };

    try {
      if (formulario.id) {
        await DocumentacionService.actualizar(payload);
      } else {
        await DocumentacionService.guardar(payload);
      }
      alert("Documentación guardada correctamente");
      navigate(-1);
    } catch (error) {
      alert("Error al guardar.",error);
    }
  };

  if (loading) return <div className="doc-loading">Cargando...</div>;
  if (!vehiculo) return <div className="doc-loading">Vehículo no encontrado</div>;

  return (
    <div className="doc-container">
    
        <h2>Documentación del Vehículo</h2>

      <form onSubmit={handleSubmit} className="doc-card">
        
        {/* HEADER */}
        <div className="doc-header">
            
            <button type="button" onClick={() => navigate(-1)} className="doc-btn-volver">
                <SlArrowLeft/>
            </button>

            <div className="doc-header-titles">
                <h2 className="doc-title">{vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}</h2>
                <span className="doc-subtitle">{vehiculo.patente}</span>
            </div>
        </div>

        {/* CUERPO LISTA */}
        <div className="doc-body">
          {itemsDocumentacion.map((item) => (
            <div key={item.name} className="doc-row">
              
              <div className="checkbox-wrapper-31">
                <input
                  type="checkbox"
                  id={item.name}
                  name={item.name}
                  checked={formulario[item.name] || false}
                  onChange={handleChange}
                />
                <label htmlFor={item.name}>
                  <svg viewBox="0 0 100 100">
                    <path className="box" d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"/>
                    <polyline className="check" points="25.5,53.5 39.5,67.5 72.5,34.5 "/>
                  </svg>
                  <span>{item.label}</span>
                </label>
              </div>

            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="doc-footer">
          <button type="submit" className="doc-btn-guardar">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default VehiculoDocumentacion;