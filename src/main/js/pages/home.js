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
			</tr>
		)
	}
}


module.exports = HomePage;