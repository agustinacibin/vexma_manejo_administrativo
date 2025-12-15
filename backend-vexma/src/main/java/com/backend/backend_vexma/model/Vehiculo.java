package com.backend.backend_vexma.model;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Vehiculo")
public class Vehiculo { 
    // Anotaciones JPA | definicion de columnas y atributos

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "patente", length = 7, nullable = false, unique = true)
    private String patente;
    @Column(name = "marca", nullable = false)
    private String marca;
    @Column(name = "modelo", nullable = false)
    private String modelo;
    @Column(name = "anio", precision = 4, nullable = false)
    private int anio;
    @Column(name = "isNuevo", nullable = false)
    private boolean isNuevo;
    @Column(name = "precioCompra", nullable = false, scale = 3)
    private double precioCompra;
    @Column(name = "precioLista", nullable = false, scale = 3)
    private double precioLista;


    // Relaciones
    @ManyToOne
    @JoinColumn(name = "idTitular", nullable = false)
    private Titular idTitular;

    @OneToMany(mappedBy = "idVehiculo", cascade = CascadeType.ALL)
    private List<Actividad> actividades;

    @OneToOne(mappedBy = "idVehiculo", cascade = CascadeType.ALL)
    private Documentacion documentacion;


    // Constructor
    public Vehiculo(){}

    public Vehiculo(String patente, String marca, String modelo, int anio, Titular idTitular, boolean isNuevo, double precioCompra, double precioLista){
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.idTitular = idTitular;
        this.isNuevo = isNuevo;
        this.precioCompra = precioCompra;
        this.precioLista = precioLista;
    }


    // Getters y setters
    long getId(){
        return this.id;
    }

    String getPatente(){
        return this.patente;
    }
    void setPatente(String patente){
        this.patente = patente;
    }

    String getMarca(){
        return this.marca;
    }
    void setMarca(String marca){
        this.marca = marca;
    }

    String getModelo(){
        return this.modelo;
    }
    void setModelo(String modelo){
        this.modelo = modelo;
    }

    int getAnio(){
        return this.anio;
    }
    void setAnio(int anio){
        this.anio = anio;
    }

    boolean getIsNuevo(){
        return isNuevo;
    }
    void setIsNuevo(boolean isNuevo){
        this.isNuevo = isNuevo;
    }

    double getPrecioCompra(){
        return this.precioCompra;
    }
    void setPrecioCompra(double precioCompra){
        this.precioCompra = precioCompra;
    }

    double getPrecioLista(){
        return this.precioLista;
    }
    void setPrecioLista(double precioLista){
        this.precioLista = precioLista;
    }


    Titular getIdTitular(){
        return this.idTitular;
    }
    void setIdTitular(Titular idTitular){
        this.idTitular = idTitular;
    }

}
