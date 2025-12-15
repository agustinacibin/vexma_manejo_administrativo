package com.backend.backend_vexma.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "titular")
public class Titular {
    //Anotaciones JPA | definicion de columnas y atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "dni", nullable = false, precision = 8, unique = true)
    private int dni;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apellido", nullable = false)
    private String apellido;
    @Column(name = "fechaNacimiento", nullable = false)
    private LocalDate fechaNacimiento;


    // Relaciones
    @OneToMany(mappedBy = "idTitular")
    private List<Vehiculo> vehiculos;

    // Constructor
    public Titular(){}
     
    public Titular(int dni, String nombre, String apellido, LocalDate fechaNacimiento) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }  

    // Getters y setters
    public long getId(){
        return this.id;
    }

    public int getDni(){
        return this.dni;
    }
    public void setDni(int dni){
        this.dni = dni;
    }

    public String getNombre(){
        return this.nombre;
    }
    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getApellido(){
        return this.apellido;
    }
    public void setApellido(String apellido){
        this.apellido = apellido;
    }

    public LocalDate getFechaNacimiento(){
        return this.fechaNacimiento;
    }
    public void setFechaNacimiento(LocalDate fechaNacimiento){
        this.fechaNacimiento = fechaNacimiento;
    }



}
