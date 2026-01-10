package com.backend.backend_vexma.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend_vexma.model.Documentacion;
import com.backend.backend_vexma.repository.DocumentacionRepository;

@Service
public class DocumentacionService {
    
    @Autowired
    private DocumentacionRepository documentacionRepository;

    public List<Documentacion> obtenerDocumentacionToda(){
        return documentacionRepository.findAll();
    }

    public Optional<Documentacion> obtenerDocumentacionPorId(Long id){
        return documentacionRepository.findById(id);
    }

    public Documentacion guardarDocumentacion(Documentacion documentacion){
        if( (documentacion.getVehiculo() == null) ||
            (documentacion.getFormulario08() == null) ||
            (documentacion.getCedulaVerde() == null) ||
            (documentacion.getTitulo() == null) ||
            (documentacion.getVerificacionPolicial() == null) ||
            (documentacion.getInformeDominioRnpa() == null) ||
            (documentacion.getInformeMultasRnpa() == null) ||
            (documentacion.getEstadoImpositivo() == null) ||
            (documentacion.getManuales() == null) ||
            (documentacion.getDuplicadoLlaves() == null) ||
            (documentacion.getItv() == null)){
            
            throw new IllegalArgumentException("Debe completar todos los campos obligatorios.");
        }

        Optional<Documentacion> docExistente = documentacionRepository.findByVehiculo(documentacion.getVehiculo());

        if (docExistente.isPresent()){
            Documentacion docDb = docExistente.get();
            
            docDb.setFormulario08(documentacion.getFormulario08());
            docDb.setCedulaVerde(documentacion.getCedulaVerde());
            docDb.setTitulo(documentacion.getTitulo());
            docDb.setVerificacionPolicial(documentacion.getVerificacionPolicial());
            docDb.setInformeDominioRnpa(documentacion.getInformeDominioRnpa());
            docDb.setInformeMultasRnpa(documentacion.getInformeMultasRnpa());
            docDb.setEstadoImpositivo(documentacion.getEstadoImpositivo());
            docDb.setManuales(documentacion.getManuales());
            docDb.setDuplicadoLlaves(documentacion.getDuplicadoLlaves());
            docDb.setItv(documentacion.getItv());

            return documentacionRepository.save(docDb);
        } else {
            return documentacionRepository.save(documentacion);
        }

    }

    public void borrarDocumentacion(Long id){
        documentacionRepository.deleteById(id);
    }
}
