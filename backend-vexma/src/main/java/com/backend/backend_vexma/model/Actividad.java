package com.backend.backend_vexma.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "Actividad")
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "isPendiente", nullable = false)
    private boolean isPendiente;
    @Column(name = "descripcion", nullable = false)
    private String descripcion;
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;
    @Column(name = "gasto", nullable = false)
    private double gasto;


    // Relaciones
    @ManyToOne
    @JoinColumn(name = "idVehiculo", nullable = false)
    private Vehiculo idVehiculo;


    // Constructor
    public Actividad(){}

    public Actividad(Vehiculo idVehiculo, boolean isPendiente, String descripcion, LocalDate fecha, double gasto){
        this.idVehiculo = idVehiculo;
        this.isPendiente = isPendiente;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.gasto = gasto;
    }

    // Getters y setters
    long getId(){
        return this.id;
    }

    Vehiculo getIdVehiculo(){
        return this.idVehiculo;
    }
    void setIdVehiculo(Vehiculo idVehiculo){
        this.idVehiculo = idVehiculo;
    }

    boolean getIsPendiente(){
        return this.isPendiente;
    }
    void setIsPendiente(boolean isPendiente){
        this.isPendiente = isPendiente;
    }

    String getDescripcion(){
        return this.descripcion;
    }
    void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    LocalDate getFecha(){
        return this.fecha;
    }
    void setFecha(LocalDate fecha){
        this.fecha = fecha;
    }

    double getGasto(){
        return gasto;
    }
    void setGasto(double gasto){
        this.gasto = gasto;
    }
}