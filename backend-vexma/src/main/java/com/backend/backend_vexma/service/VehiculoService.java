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

        // Primero muestra vehiculos activos (fechaEgreso = null), y luego los vendidos 
        return vehiculos.stream()
                .sorted(Comparator.comparing(Vehiculo::getFechaEgreso,
                        Comparator.nullsFirst(Comparator.naturalOrder())))
                .collect(Collectors.toList());
    }

    public Optional<Vehiculo> obtenerVehiculoPorId(Long id){
        return vehiculoRepository.findById(id);
    }

    public Vehiculo guardarVehiculo(Vehiculo vehiculo){
        
        Integer anioActual = LocalDate.now().getYear();
        // Validar año ingresado menor o igual al actual
        if((vehiculo.getAnio() != null) && (vehiculo.getAnio() > anioActual)){
            throw new IllegalArgumentException("El año " + vehiculo.getAnio()
                                                + " es incorrecto. No puede ser mayor a " + anioActual);
        }

        // Si no se ingreso una fecha de ingreso, se autocompleta con la actual
        if(vehiculo.getFechaIngreso() == null){
            vehiculo.setFechaIngreso(LocalDate.now());
        }

        // Asegurar que al crear un nuevo vehiculo, no nazca vendido
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
        
        // Si se ingresa una fecha, se guarda en fechaEgreso; si no se ingresa, se guarda en fechaEgreso la fecha actual
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

        // Si se ingresa una fecha, se guarda en fechaIngreso; sino, se guardará la fecha actual 
        if(fecha != null){
            vehiculo.setFechaIngreso(fecha);
        } else {
            vehiculo.setFechaIngreso(LocalDate.now());
        }
        
        vehiculo.setFechaEgreso(null);

        return vehiculoRepository.save(vehiculo);
        
    }

    // public double calcularGastoTotal(Long id) {
    //     Optional<Vehiculo> v = vehiculoRepository.findById(id);
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
