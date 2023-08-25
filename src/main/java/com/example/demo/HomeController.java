package com.example.demo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}

	@GetMapping(path = "/api/bandas/{id}/formacion")
	public @ResponseBody List<Map <String, Object>> formacion(@PathVariable Integer id){
		String sql = "SELECT integrante.id as ID, musico.nombre as MUSICO, instrumento.nombre as INSTRUMENTO FROM integrante JOIN musico ON integrante.id_musico=musico.id JOIN instrumento ON integrante.id_instrumento=instrumento.id WHERE integrante.id_banda = ?";
		List<Map <String, Object>> queryResult = jdbcTemplate.queryForList(sql, id);
		return queryResult;
	}

	@GetMapping(path = "/api/facturacion")
	public @ResponseBody List<Map <String, Object>> facturacion(){
		String sql = "SELECT  Venta.id as id, Venta.numero as numero, Venta.total as total, producto.nombre as producto, ventadetalle.cantidad AS cantidad FROM Venta JOIN ventadetalle ON Venta.id = ventadetalle.id_venta JOIN producto ON producto.id = ventadetalle.id_producto";
		List<Map <String, Object>> queryResult = jdbcTemplate.queryForList(sql);
		return queryResult;
	}

	/**
	 * 
	 * 
	 * 
	 * 
	 */

}