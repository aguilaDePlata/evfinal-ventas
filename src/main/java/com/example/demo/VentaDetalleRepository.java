package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "ventaDetalles", path = "ventaDetalles")
public interface VentaDetalleRepository extends CrudRepository<VentaDetalle, Long> {
    
}
