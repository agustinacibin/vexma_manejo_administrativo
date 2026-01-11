import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import VehiculoList from './pages/VehiculoList'
import VehiculoForm from './pages/VehiculoForm'
import TitularForm from './pages/TitularForm.jsx'
import VehiculoDetalle from './pages/VehiculoDetalle.jsx'
import VehiculoDocumentacion from './pages/VehiculoDocumentacion.jsx'
import TitularList from './pages/TitularList.jsx'

function App() {

  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Gestión Vexma</h1>
          <Routes>
            <Route path='/' element={<VehiculoList/>}/>
            <Route path='/crear' element={<VehiculoForm/>}/>
            <Route path='/vehiculos/:id' element={<VehiculoDetalle/>}/>
            <Route path='/vehiculos/:id/editar' element={<VehiculoForm/>}/>
            <Route path='/vehiculos/:id/documentacion' element={<VehiculoDocumentacion/>}/>
            <Route path='/titulares' element={<TitularList/>}/>
            <Route path='/crear-titular' element={<TitularForm/>}/>
            <Route path='/titulares/:id/editar' element={<TitularForm/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
