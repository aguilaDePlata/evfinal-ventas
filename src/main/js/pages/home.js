const React = require('react');
const client = require('../client');
const {Link} = require('react-router-dom');

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { instrumentos: [], musicos: [], bandas: [], ventas:[], productos:[], facturacion:[] };
	}
	componentDidMount() {
		client({ method: 'GET', path: '/api/facturacion' }).done(response => {
			this.setState({ facturacion: response.entity });
		});

		client({ method: 'GET', path: '/api/ventas' }).done(response => {
			this.setState({ ventas: response.entity._embedded.ventas });
		});

		client({ method: 'GET', path: '/api/productos' }).done(response => {
			this.setState({ productos: response.entity._embedded.productos });
		});

		client({ method: 'GET', path: '/api/instrumentos' }).done(response => {
			this.setState({ instrumentos: response.entity._embedded.instrumentos });
		});

		client({ method: 'GET', path: '/api/musicos' }).done(response => {
			this.setState({ musicos: response.entity._embedded.musicos });
		});

		client({ method: 'GET', path: '/api/bandas' }).done(response => {
			this.setState({ bandas: response.entity._embedded.bandas });
		});

	}
	render() {
		return (
			<>
				<h1>Evaluacion Final</h1>

				<div style={  {"width": "100%", "display": "flex"}   }>
					<div style={{"width": "calc(100% / 3)"}}>
						<Titulo entidad="Facturacion" emoji="🎸" />
						<FacturacionList facturas={this.state.facturacion} />
						<Link to="/nueva-factura">Nueva Factura</Link>
					</div>

					{/* <div style={{"width": "calc(100% / 3)"}}>
						<Titulo entidad="Intrumentos" emoji="🎸" />
						<InstrumentoList instrumentos={this.state.instrumentos} />
						<Link to="/nuevo-instrumento">Nuevo Instrumento</Link>
					</div>
					<div style={{"width": "calc(100% / 3)"}}>
						<Titulo entidad="Musicos" emoji="🎶" />
						<MusicoList musicos={this.state.musicos} />
						<Link to="/nuevo-musico">Nuevo Músico</Link>
					</div>
					<div style={{"width": "calc(100% / 3)"}}>
						<Titulo entidad="Bandas" emoji="👩🏼‍🎤" />
						<BandaList bandas={this.state.bandas} />
						<Link to="/nueva-banda">Nueva Banda</Link>
					</div> */}
				</div>


			</>
		)
	}
}

const Titulo = (props) => {
	return (
		<>
			<hr />
			<h2>{props.emoji} - {props.entidad}</h2>
			<hr />
			Lista completa de {props.entidad.toLowerCase()}
		</>
	)
}


class FacturacionList extends React.Component {
	render() {
		const facturas = this.props.facturas.map((factura, index) =>
			<Factura key={index} factura={factura} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Id</th>
						<th>Numero</th>
						<th>Total</th>
						<th>Producto</th>												
						<th>Cantidad</th>																		
						{/* <th>Acciones</th> */}
					</tr>
					{facturas}
				</tbody>
			</table>
		)
	}
}

// class InstrumentoList extends React.Component {
// 	render() {
// 		const instrumentos = this.props.instrumentos.map(instrumento =>
// 			<Instrumento key={instrumento._links.self.href} instrumento={instrumento} />
// 		);
// 		return (
// 			<table border="1">
// 				<tbody>
// 					<tr>
// 						<th>Nombre</th>
// 						<th>Categoría</th>
// 						<th>Acciones</th>
// 					</tr>
// 					{instrumentos}
// 				</tbody>
// 			</table>
// 		)
// 	}
// }
// class MusicoList extends React.Component {
// 	render() {
// 		const musicos = this.props.musicos.map(musico =>
// 			<Musico key={musico._links.self.href} musico={musico} />
// 		);
// 		return (
// 			<table border="1">
// 				<tbody>
// 					<tr>
// 						<th>Nombre</th>
// 						<th>Acciones</th>
// 					</tr>
// 					{musicos}
// 				</tbody>
// 			</table>
// 		)
// 	}
// }
// class BandaList extends React.Component {
// 	render() {
// 		const bandas = this.props.bandas.map(banda =>
// 			<Banda key={banda._links.self.href} banda={banda} />
// 		);
// 		return (
// 			<table border="1">
// 				<tbody>
// 					<tr>
// 						<th>Nombre</th>
// 						<th>Acciones</th>
// 					</tr>
// 					{bandas}
// 				</tbody>
// 			</table>
// 		)
// 	}
// }

class Factura extends React.Component {
	render() {
		const id = this.props.factura.ID
		return (
			<tr>
				<td>{this.props.factura.ID}</td>
				<td>{this.props.factura.NUMERO}</td>
				<td>{this.props.factura.TOTAL}</td>
				<td>{this.props.factura.PRODUCTO}</td>				
				<td>{this.props.factura.CANTIDAD}</td>				
				{/* <td>
					<Link to={"/ver-factura/" + id}>Ver</Link> | 
					<Link to={"/editar-factura/" + id}>Editar</Link>
				</td> */}
			</tr>
		)
	}
}

// class Instrumento extends React.Component {
// 	render() {
// 		const id = this.props.instrumento._links.self.href.split("/").slice(-1)
// 		return (
// 			<tr>
// 				<td>{this.props.instrumento.nombre}</td>
// 				<td>{this.props.instrumento.categoria}</td>
// 				<td>
// 					<Link to={"/ver-instrumento/" + id}>Ver</Link> | 
// 					<Link to={"/editar-instrumento/" + id}>Editar</Link>
// 				</td>
// 			</tr>
// 		)
// 	}
// }
// class Musico extends React.Component {
// 	render() {
// 		const id = this.props.musico._links.self.href.split("/").slice(-1)

// 		return (
// 			<tr>
// 				<td>{this.props.musico.nombre}</td>
// 				<td>
// 					<Link to={"/ver-musico/" + id}>Ver</Link>
// 				</td>
// 			</tr>
// 		)
// 	}
// }
// class Banda extends React.Component {
// 	render() {
// 		const id = this.props.banda._links.self.href.split("/").slice(-1)

// 		return (
// 			<tr>
// 				<td>{this.props.banda.nombre}</td>
// 				<td>
// 					<Link to={"/ver-banda/" + id}>Ver</Link>
// 				</td>
// 			</tr>
// 		)
// 	}
// }

module.exports = HomePage;