package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final InstrumentoRepository repositoryI;
	private final MusicoRepository repositoryM;
	private final BandaRepository repositoryB;
	private final IntegranteRepository repositoryN;

	private final VentaRepository _ventaRepository;
	private final VentaDetalleRepository _ventaDetalleRepository;
	private final ProductoRepository _productoRepository;

	@Autowired
	public DatabaseLoader(
		InstrumentoRepository repositoryI,
		MusicoRepository repositoryM,
		BandaRepository repositoryB,
		IntegranteRepository repositoryN,

		VentaRepository ventaRepository,
		VentaDetalleRepository ventaDetalleRepository,
		ProductoRepository productoRepository
		) {
		this.repositoryI = repositoryI;
		this.repositoryM = repositoryM;
		this.repositoryB = repositoryB;
		this.repositoryN = repositoryN;

		this._ventaRepository = ventaRepository;
		this._ventaDetalleRepository = ventaDetalleRepository;
		this._productoRepository = productoRepository;
	}

	@Override
	public void run(String... strings) throws Exception {

		this.repositoryI.save(new Instrumento("Guitarra", "Cuerda", "de madera, con caja de resonancia, 6 cuerdas templadas"));
		this.repositoryI.save(new Instrumento("Ukelele","Cuerda","de madera, con caja de resonancia pequeña, 4 cuerdas templadas"));
		this.repositoryI.save(new Instrumento("Melódica","Viento","teclado pequeño de 2 octavas, sonorizado por soplido"));
		Instrumento iVoz = new Instrumento("Voz","Viento",".");
		this.repositoryI.save(iVoz);
		Instrumento iGuitarraElectrica = new Instrumento("Guitarra Electrica","Electrónico", ".");
		this.repositoryI.save(iGuitarraElectrica);
		this.repositoryI.save(new Instrumento("Batería","Percusión","."));

		this.repositoryM.save(new Musico("Daniel F"));
		Musico mFreddy = new Musico("Freddy");
		this.repositoryM.save(mFreddy);
		Musico mBrian = new Musico("Brian");
		this.repositoryM.save(mBrian);

		Banda bQueen = new Banda("Queen");
		this.repositoryB.save(bQueen);

		this.repositoryN.save(new Integrante(bQueen, mFreddy, iVoz));
		this.repositoryN.save(new Integrante(bQueen, mBrian, iGuitarraElectrica));

		// Ventas
		Producto chompa = new Producto("Chompa Alpaca", 240.00);
		Producto camisa = new Producto("Camisa Seda", 140.00);
		Producto cartera = new Producto("Cartera de Cuero", 340.00);

		Venta vtaUno = new Venta("001-000001", 100.00, 20.00, 120.00);
	
		VentaDetalle vtaUnoDet1 = new VentaDetalle(10, vtaUno, chompa);
		VentaDetalle vtaUnoDet2 = new VentaDetalle(23, vtaUno, camisa);
		VentaDetalle vtaUnoDet3 = new VentaDetalle(2, vtaUno, cartera);


		this._productoRepository.save(chompa);
		this._productoRepository.save(camisa);
		this._productoRepository.save(cartera);

		this._ventaRepository.save(vtaUno);

		this._ventaDetalleRepository.save(vtaUnoDet1);
		this._ventaDetalleRepository.save(vtaUnoDet2);
		this._ventaDetalleRepository.save(vtaUnoDet3);
	}
}