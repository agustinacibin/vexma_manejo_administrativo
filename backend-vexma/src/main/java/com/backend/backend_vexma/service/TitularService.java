package com.backend.backend_vexma.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend_vexma.model.Titular;
import com.backend.backend_vexma.repository.TitularRepository;

@Service
public class TitularService {
    
    @Autowired
    private TitularRepository titularRepository;

    public List<Titular> obtenerTitularesTodos(){
        return titularRepository.findAll();
    }

    public Optional<Titular> obtenerTitularPorId(Long id){
        return titularRepository.findById(id);
    }

    public Titular guardarTitular(Titular titular){
        if( (titular.getDni() == null) ||
            (titular.getNombre() == null) || (titular.getNombre().isEmpty()) ||
            (titular.getApellido() == null) || (titular.getApellido().isEmpty()) ||
            (titular.getFechaNacimiento() == null)){
            
            throw new IllegalArgumentException("Debe completar todos los campos obligatorios.");
        }
        return titularRepository.save(titular);
    }

    public void borrarTitular(Long id){
        titularRepository.deleteById(id);
    }
}
