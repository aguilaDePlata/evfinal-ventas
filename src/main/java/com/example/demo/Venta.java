package com.example.demo;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "venta")
public class Venta {
    
    private @Id @GeneratedValue Long id;
    private String numero;
    private Double subTotal;
    private Double impuesto;
    private Double total;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    public Double getImpuesto() {
        return impuesto;
    }

    public void setImpuesto(Double impuesto) {
        this.impuesto = impuesto;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Venta(String numero, Double subTotal, Double impuesto, Double total) {
        this.numero = numero;
        this.subTotal = subTotal;
        this.impuesto = impuesto;
        this.total = total;
    }

    public Venta() {
    }    
}
