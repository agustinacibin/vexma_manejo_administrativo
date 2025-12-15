package com.backend.backend_vexma.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Documentacion")
public class Documentacion {
    // JPA Annotations and definition of atributes and columns

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "formulario08", nullable = false)
    private boolean formulario08;
    @Column(name = "cedulaVerde", nullable = false)
    private boolean cedulaVerde;
    @Column(name = "titulo", nullable = false)
    private boolean titulo;
    @Column(name = "verificacionPolicial", nullable = false)
    private boolean verificacionPolicial;
    @Column(name = "informeDominioRnpa", nullable = false)
    private boolean informeDominioRnpa;
    @Column(name = "informeMultasRnpa", nullable = false)
    private boolean informeMultasRnpa;
    @Column(name = "estadoImpositivo", nullable = false)
    private boolean estadoImpositivo;
    @Column(name = "manuales", nullable = false)
    private boolean manuales;
    @Column(name = "duplicadoLlaves", nullable = false)
    private boolean duplicadoLlaves;
    @Column(name = "itv", nullable = false)
    private boolean itv;


    // Relaciones
    @OneToOne
    @JoinColumn(name = "idVehiculo", nullable = false)
    private Vehiculo idVehiculo;


    // Constructor
    public Documentacion(){}

    public Documentacion(Vehiculo idVehiculo, boolean formulario08, boolean cedulaVerde, boolean titulo, boolean verificacionPolicial, boolean informeDominioRnpa, boolean informeMultasRnpa, boolean estadoImpositivo, boolean manuales, boolean duplicadoLlaves, boolean itv){
        this.idVehiculo = idVehiculo;
        this.formulario08 = formulario08;
        this.cedulaVerde = cedulaVerde;
        this.titulo = titulo;
        this.verificacionPolicial = verificacionPolicial;
        this.informeDominioRnpa = informeDominioRnpa;
        this.informeMultasRnpa = informeMultasRnpa;
        this.estadoImpositivo = estadoImpositivo;
        this.manuales = manuales;
        this.duplicadoLlaves = duplicadoLlaves;
        this.itv = itv;
    }

    // Getters y setters
    Vehiculo getIdVehiculo(){
        return this.idVehiculo;
    }
    void setIdVehiculo(Vehiculo idVehiculo){
        this.idVehiculo = idVehiculo;
    }

    boolean getFormulario08(){
        return this.formulario08;
    }
    void setFormulario08(boolean formulario08){
        this.formulario08 = formulario08;
    }

    boolean getCedulaVerde(){
        return this.cedulaVerde;
    }
    void setCedulaVerde(boolean cedulaVerde){
        this.cedulaVerde = cedulaVerde;
    }

    boolean getTitulo(){
        return this.titulo;
    }
    void setTitulo(boolean titulo){
        this.titulo = titulo;
    }

    boolean getVerificacionPolicial(){
        return this.verificacionPolicial;
    }
    void setVerificacionPolicial(boolean verificacionPolicial){
        this.verificacionPolicial = verificacionPolicial;
    }

    boolean getInformeDominioRnpa(){
        return this.informeDominioRnpa;
    }
    void setInformeDominioRnpa(boolean informeDominioRnpa){
        this.informeDominioRnpa = informeDominioRnpa;
    }

    boolean getInformeMultasRnpa(){
        return this.informeMultasRnpa;
    }
    void setInformeMultasRnpa(boolean informeMultasRnpa){
        this.informeMultasRnpa = informeMultasRnpa;
    }

    boolean getEstadoImpositivo(){
        return this.estadoImpositivo;
    }
    void setEstadoImpositivo(boolean estadoImpositivo){
        this.estadoImpositivo = estadoImpositivo;
    }

    boolean getManuales(){
        return this.manuales;
    }
    void setManuales(boolean manuales){
        this.manuales = manuales;
    }

    boolean getDuplicadoLlaves(){
        return this.duplicadoLlaves;
    }
    void setDuplicadoLlaves(boolean duplicadoLlaves){
        this.duplicadoLlaves = duplicadoLlaves;
    }

    // isCompleta --> en base al estado de determinados documentos, retorna si el estado general de la documentacion es completa o incompleta
    boolean isCompleta(){
        return this.formulario08 && 
                this.cedulaVerde && 
                this.titulo && 
                this.verificacionPolicial && 
                this.informeDominioRnpa && 
                this.informeMultasRnpa && 
                this.estadoImpositivo && 
                this.manuales && 
                this.duplicadoLlaves;
    }
}
