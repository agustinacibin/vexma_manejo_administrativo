package com.backend.backend_vexma.service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend_vexma.model.Vehiculo;
import com.backend.backend_vexma.repository.VehiculoRepository;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<Vehiculo> obtenerVehiculosTodos(){
        List<Vehiculo> vehiculos = vehiculoRepository.findAll();

        return vehiculos.stream()
                .sorted(Comparator.comparing(Vehiculo::getFechaEgreso,
                        Comparator.nullsFirst(Comparator.naturalOrder())))
                .collect(Collectors.toList());
    }

    public Optional<Vehiculo> obtenerVehiculoPorId(Long id){
        return vehiculoRepository.findById(id);
    }

    public Vehiculo guardarVehiculo(Vehiculo vehiculo){

        if( (vehiculo.getPatente() == null) || vehiculo.getPatente().isEmpty() ||
            (vehiculo.getMarca() == null) || vehiculo.getMarca().isEmpty() ||
            (vehiculo.getModelo() == null) || vehiculo.getModelo().isEmpty() ||
            (vehiculo.getAnio() == null) ||
            (vehiculo.getVersion() == null) || vehiculo.getVersion().isEmpty() ||
            (vehiculo.getTipo() == null) || 
            (vehiculo.getTitular() == null) ||
            (vehiculo.getIsNuevo() == null) ||
            (vehiculo.getPrecioCompra() == null) ||
            (vehiculo.getPrecioLista() == null)){
                
            throw new IllegalArgumentException("Debe completar todos los campos obligatorios.");
        }

        if(vehiculo.getFechaIngreso() == null){
            vehiculo.setFechaIngreso(LocalDate.now());
        }

        if(vehiculo.getId() == null){
            vehiculo.setFechaEgreso(null);
        }

        return vehiculoRepository.save(vehiculo);
    }

    public void borrarVehiculo(Long id){
        vehiculoRepository.deleteById(id);
    }

    public Vehiculo marcarComoVendido(Long id, LocalDate fecha){
        Vehiculo vehiculo = vehiculoRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Vehiculo no encontrado."));
        
        if(fecha != null){
            vehiculo.setFechaEgreso(fecha);
        }else{
            vehiculo.setFechaEgreso(LocalDate.now());
        }

        return vehiculoRepository.save(vehiculo);

    }

    public Vehiculo reingresarVehiculo(Long id, LocalDate fecha){
        Vehiculo vehiculo = vehiculoRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Vehiculo no encontrado."));

        if(fecha != null){
            vehiculo.setFechaIngreso(fecha);
        } else {
            vehiculo.setFechaIngreso(LocalDate.now());
        }
        
        vehiculo.setFechaEgreso(null);

        return vehiculoRepository.save(vehiculo);
        
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
