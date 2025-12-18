package com.backend.backend_vexma.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class VehiculoDTO {

    @NotBlank(message="La patente no puede estar vacia")
    @Pattern(regexp = "^[A-Z0-9]{6,7}$", message = "La patente debe tener 6 o 7 caracteres alfanumericos")
    private String patente;

    @NotBlank(message="La marca no puede estar vacia")
    private String marca;

    @NotBlank(message="El modelo no puede estar vacio")
    private String modelo;

    @NotNull(message="El año no puede estar vacio")
    @Min(value=1000, message="El año debe tener como minimo 4 digitos")
    @Max(value=9999, message="El año del vehiculo no puede superar el año actual")
    private Integer anio;

    @NotBlank(message="El tipo no puede estar vacio")
    private String tipo;

    @NotBlank(message="La version no puede estar vacia")
    private String version;


    public String getPatente() {
        return patente;
    }
    public void setPatente(String patente) {
        this.patente = patente;
    }

    public String getMarca() {
        return marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getAnio() {
        return anio;
    }
    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }
    
    
    
}
