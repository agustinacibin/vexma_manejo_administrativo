package com.backend.backend_vexma.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Importante importar esto

import com.backend.backend_vexma.model.Documentacion;
import com.backend.backend_vexma.repository.DocumentacionRepository;

@Service
public class DocumentacionService {
    
    private final DocumentacionRepository documentacionRepository;

    public DocumentacionService(DocumentacionRepository documentacionRepository) {
        this.documentacionRepository = documentacionRepository;
    }

    public List<Documentacion> obtenerDocumentacionToda(){
        return documentacionRepository.findAll();
    }

    public Optional<Documentacion> obtenerDocumentacionPorId(Long id){
        return documentacionRepository.findById(id);
    }

    @Transactional
    public Documentacion guardarDocumentacion(Documentacion documentacionNuevosDatos){
        
        Optional<Documentacion> docExistente = documentacionRepository.findByVehiculo_Id(documentacionNuevosDatos.getVehiculo().getId());

        if (docExistente.isPresent()){
            Documentacion docDb = docExistente.get();
            
            docDb.setFormulario08(documentacionNuevosDatos.getFormulario08());
            docDb.setCedulaVerde(documentacionNuevosDatos.getCedulaVerde());
            docDb.setTitulo(documentacionNuevosDatos.getTitulo());
            docDb.setVerificacionPolicial(documentacionNuevosDatos.getVerificacionPolicial());
            docDb.setInformeDominioRnpa(documentacionNuevosDatos.getInformeDominioRnpa());
            docDb.setInformeMultasRnpa(documentacionNuevosDatos.getInformeMultasRnpa());
            docDb.setEstadoImpositivo(documentacionNuevosDatos.getEstadoImpositivo());
            docDb.setManuales(documentacionNuevosDatos.getManuales());
            docDb.setDuplicadoLlaves(documentacionNuevosDatos.getDuplicadoLlaves());
            docDb.setItv(documentacionNuevosDatos.getItv());

            docDb.setFechaFormulario08(documentacionNuevosDatos.getFechaFormulario08());
            docDb.setFechaCedulaVerde(documentacionNuevosDatos.getFechaCedulaVerde());
            docDb.setFechaTitulo(documentacionNuevosDatos.getFechaTitulo());
            docDb.setFechaVerificacionPolicial(documentacionNuevosDatos.getFechaVerificacionPolicial());
            docDb.setFechaInformeDominioRnpa(documentacionNuevosDatos.getFechaInformeDominioRnpa());
            docDb.setFechaInformeMultasRnpa(documentacionNuevosDatos.getFechaInformeMultasRnpa());
            docDb.setFechaEstadoImpositivo(documentacionNuevosDatos.getFechaEstadoImpositivo());
            docDb.setFechaManuales(documentacionNuevosDatos.getFechaManuales());
            docDb.setFechaDuplicadoLlaves(documentacionNuevosDatos.getFechaDuplicadoLlaves());
            docDb.setFechaItv(documentacionNuevosDatos.getFechaItv());

            return documentacionRepository.save(docDb);
        } else {
            return documentacionRepository.save(documentacionNuevosDatos);
        }
    }

    public void borrarDocumentacion(Long id){
        documentacionRepository.deleteById(id);
    }
}