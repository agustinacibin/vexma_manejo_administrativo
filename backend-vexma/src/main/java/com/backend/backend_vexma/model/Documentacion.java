package com.backend.backend_vexma.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Documentacion")
public class Documentacion {
    // JPA Annotations and definition of atributes and columns

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "formulario08", nullable = false)
    private Boolean formulario08;
    @Column(name = "cedulaVerde", nullable = false)
    private Boolean cedulaVerde;
    @Column(name = "titulo", nullable = false)
    private Boolean titulo;
    @Column(name = "verificacionPolicial", nullable = false)
    private Boolean verificacionPolicial;
    @Column(name = "informeDominioRnpa", nullable = false)
    private Boolean informeDominioRnpa;
    @Column(name = "informeMultasRnpa", nullable = false)
    private Boolean informeMultasRnpa;
    @Column(name = "estadoImpositivo", nullable = false)
    private Boolean estadoImpositivo;
    @Column(name = "manuales", nullable = false)
    private Boolean manuales;
    @Column(name = "duplicadoLlaves", nullable = false)
    private Boolean duplicadoLlaves;
    @Column(name = "itv", nullable = false)
    private Boolean itv;


    // Relaciones
    @OneToOne
    @JoinColumn(name = "id_vehiculo", nullable = false)
    @JsonIgnoreProperties("documentacion")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Vehiculo vehiculo;


    // Constructor
    public Documentacion(){}

    public Documentacion(Vehiculo vehiculo, Boolean formulario08, Boolean cedulaVerde, Boolean titulo, Boolean verificacionPolicial, Boolean informeDominioRnpa, Boolean informeMultasRnpa, Boolean estadoImpositivo, Boolean manuales, Boolean duplicadoLlaves, Boolean itv){
        this.vehiculo = vehiculo;
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
    public Long getId(){
        return this.id;
    } 

    public Vehiculo getVehiculo(){
        return this.vehiculo;
    }
    public void setVehiculo(Vehiculo vehiculo){
        this.vehiculo = vehiculo;
    }

    public Boolean getFormulario08(){
        return this.formulario08;
    }
    public void setFormulario08(Boolean formulario08){
        this.formulario08 = formulario08;
    }

    public Boolean getCedulaVerde(){
        return this.cedulaVerde;
    }
    public void setCedulaVerde(Boolean cedulaVerde){
        this.cedulaVerde = cedulaVerde;
    }

    public Boolean getTitulo(){
        return this.titulo;
    }
    public void setTitulo(Boolean titulo){
        this.titulo = titulo;
    }

    public Boolean getVerificacionPolicial(){
        return this.verificacionPolicial;
    }
    public void setVerificacionPolicial(Boolean verificacionPolicial){
        this.verificacionPolicial = verificacionPolicial;
    }

    public Boolean getInformeDominioRnpa(){
        return this.informeDominioRnpa;
    }
    public void setInformeDominioRnpa(Boolean informeDominioRnpa){
        this.informeDominioRnpa = informeDominioRnpa;
    }

    public Boolean getInformeMultasRnpa(){
        return this.informeMultasRnpa;
    }
    public void setInformeMultasRnpa(Boolean informeMultasRnpa){
        this.informeMultasRnpa = informeMultasRnpa;
    }

    public Boolean getEstadoImpositivo(){
        return this.estadoImpositivo;
    }
    public void setEstadoImpositivo(Boolean estadoImpositivo){
        this.estadoImpositivo = estadoImpositivo;
    }

    public Boolean getManuales(){
        return this.manuales;
    }
    public void setManuales(Boolean manuales){
        this.manuales = manuales;
    }

    public Boolean getDuplicadoLlaves(){
        return this.duplicadoLlaves;
    }
    public void setDuplicadoLlaves(Boolean duplicadoLlaves){
        this.duplicadoLlaves = duplicadoLlaves;
    }

    public Boolean getItv(){
        return this.itv;
    }
    public void setItv(Boolean itv){
        this.itv = itv;
    }

    // isCompleta --> en base al estado de determinados documentos, retorna si el estado general de la documentacion es completa o incompleta
    public Boolean isCompleta(){
        return this.formulario08 && 
                this.cedulaVerde && 
                this.titulo && 
                this.verificacionPolicial && 
                this.informeDominioRnpa && 
                this.informeMultasRnpa && 
                this.estadoImpositivo;
    }
}
