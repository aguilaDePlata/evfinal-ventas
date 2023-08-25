package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ventadetalle")
public class VentaDetalle {
    private @Id @GeneratedValue Long id;
    private Integer cantidad;

    @ManyToOne()
    @JoinColumn(name = "id_venta")
    private Venta venta;

    @ManyToOne()
    @JoinColumn(name = "id_producto")
    private Producto producto; 


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Integer getCantidad() {
        return cantidad;
    }


    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }




    public Venta getVenta() {
        return venta;
    }


    public void setVenta(Venta venta) {
        this.venta = venta;
    }


    public Producto getProducto() {
        return producto;
    }


    public void setProducto(Producto producto) {
        this.producto = producto;
    }    

    public VentaDetalle(Integer cantidad, Venta venta, Producto producto) {
        this.cantidad = cantidad;
        this.venta = venta;
        this.producto = producto;
    }

    public VentaDetalle() {
    }       
}
