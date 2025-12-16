package com.backend.backend_vexma.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend_vexma.model.Vehiculo;
import com.backend.backend_vexma.service.VehiculoService;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "*")
public class VehiculoController {
    
    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping
    public List<Vehiculo> obtenerVehiculosTodos(){
        return vehiculoService.obtenerVehiculosTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerVehiculoPorId(@PathVariable Long id) {
        Optional<Vehiculo> vehiculo = vehiculoService.obtenerVehiculoPorId(id);
        
        if (vehiculo.isPresent()) {
            return ResponseEntity.ok(vehiculo.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<?> guardarVehiculo(@RequestBody Vehiculo vehiculo){
        try {
            Vehiculo guardado = vehiculoService.guardarVehiculo(vehiculo);
            return ResponseEntity.ok(guardado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<Void> borrarVehiculo(@PathVariable Long id){
        vehiculoService.borrarVehiculo(id);
        
        return ResponseEntity.noContent().build();

    }
}
