package com.backend.backend_vexma.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend_vexma.model.Vehiculo;
import com.backend.backend_vexma.repository.VehiculoRepository;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<Vehiculo> obtenerVehiculosTodos(){
        return vehiculoRepository.findAll();
    }

    public Optional<Vehiculo> obtenerVehiculoPorId(Long id){
        return vehiculoRepository.findById(id);
    }

    public Vehiculo guardarVehiculo(Vehiculo vehiculo){

        if( (vehiculo.getPatente() == null) || vehiculo.getPatente().isEmpty() ||
            (vehiculo.getMarca() == null) || vehiculo.getMarca().isEmpty() ||
            (vehiculo.getModelo() == null) || vehiculo.getModelo().isEmpty() ||
            (vehiculo.getAnio() == null) ||
            (vehiculo.getTitular() == null) ||
            (vehiculo.getIsNuevo() == null) ||
            (vehiculo.getPrecioCompra() == null) ||
            (vehiculo.getPrecioLista() == null)){
                
            throw new IllegalArgumentException("Debe completar todos los campos obligatorios.");
        }

        return vehiculoRepository.save(vehiculo);
    }

    public void borrarVehiculo(Long id){
        vehiculoRepository.deleteById(id);
    }

    // public double calcularGastoTotal(Long idVehiculo) {
    //     Optional<Vehiculo> v = vehiculoRepository.findById(idVehiculo);
    //     if (v.isPresent()) {
    //         Vehiculo vehiculo = v.get();
    //         if(vehiculo.getActividades() == null){return 0.0;}
    //         return vehiculo.getActividades().stream()
    //                 .mapToDouble(actividad -> actividad.getGasto()) // expresion Lambda
    //                 .sum();
    //     }
    //     return 0.0;
    // }

}
