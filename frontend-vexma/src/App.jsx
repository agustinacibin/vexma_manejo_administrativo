import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import VehiculoList from './pages/VehiculoList'
import VehiculoForm from './pages/VehiculoForm'
import TitularForm from './pages/TitularForm.jsx'
import VehiculoDetalle from './pages/VehiculoDetalle.jsx'
import VehiculoDocumentacion from './pages/VehiculoDocumentacion.jsx'

function App() {

  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Gestión Vexma</h1>
          <Routes>
            <Route path='/' element={<VehiculoList/>}/>
            <Route path='/crear' element={<VehiculoForm/>}/>
            <Route path='/crear-titular' element={<TitularForm/>}/>
            <Route path='/vehiculos/:id' element={<VehiculoDetalle/>}/>
            <Route path='/vehiculos/:id/documentacion' element={<VehiculoDocumentacion/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
