const React = require('react');
const {useState, useEffect} = require('react');
const { Link,useParams } = require('react-router-dom');
const client = require('../client');

const NuevaVentaPage = () => {

    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});

    const [numeroDocumento, setNumeroDocumento] = useState('');    
    const [idProducto, setIdProducto] = useState('');    
    const [precio, setPrecio] = useState(0);    
    const [subTotal, setSubTotal] = useState(0);
    const [impuesto, setImpuesto] = useState(0);
    const [total, setTotal] = useState(0);
    const [cantidad, setCantidad] = useState(0);
                     

    const handleBuscaProducto = (id) => {
        client({
            method: 'GET',
            path: '/api/productos/' + id
        }).done(response=>{
            setProducto(response.entity);
            setIdProducto(response.entity._links.self.href.split('/').slice(-1)[0]);
            setPrecio(response.entity.precio);
        })        
    }

    const handleCalcularTotales = (cantidad) => {
        setCantidad(cantidad);

        let subTot = producto.precio * parseInt(cantidad); 
        let imp = subTot*0.18;
        let tot = subTot+imp;

        setSubTotal(subTot);
        setImpuesto(imp);
        setTotal(tot);
    };

    const handleSubmit = (evento)=>{
        evento.preventDefault();
        client({
            method: 'POST',
            path: '/api/ventas',
            entity: {
                numero: numeroDocumento,
                subTotal: subTotal,
                impuesto: impuesto,
                total:total
            },
            headers: {'Content-Type': 'application/json'}
        }).done( response=>{
            let idDeVenta = response.headers.Location.split('/').slice(-1)[0];
            client({
                method: 'POST',
                path: '/api/ventaDetalles',
                entity: {
                    cantidad: cantidad,
                    venta: 'http://localhost:8080/api/ventas/' + idDeVenta,
                    producto: 'http://localhost:8080/api/productos/' + idProducto
                },
                headers: {'Content-Type': 'application/json'}
            }).done(()=>{
               window.location = '/';
            }) 

        })       
    }

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/productos'
        }).done(response=>{
            setProductos(response.entity._embedded.productos)
        })
    },[])

    return (
        <>
            <h1>Nueva Venta</h1>
            <form onSubmit={handleSubmit}>                
                <label>Numero</label>
                <input type="text" id='numeroDoumento' name='numeroDoumento' onChange={e=>setNumeroDocumento(e.target.value)} /> 
                <br />
                <label htmlFor='producto'>Producto</label>
                <select name="producto" id="producto" onChange={e => handleBuscaProducto(e.target.value)}>
                    <option>-- Seleccionar --</option>
                    {productos.map((producto) => {	
                        const value = producto._links.self.href.split('/').slice(-1)[0]
                        return (
                            <option key={value} value={value}>{producto.nombre}</option>
                        )
                    })}
                </select>
                <br />                
                <label>Precio</label>
                <input type="text" id='precio' name='precio' value={precio} style={{ background: '#C3C3C3'}} readOnly/>                 
                <br />                
                <label>Cantidad</label>
                <input type="number" id='cantidad' name='cantidad' value={cantidad} onChange={e=>handleCalcularTotales(e.target.value)} />                 
                <br />                
                <label>SubTotal</label>
                <input type="text" id='subtotal' name='subtotal' value={subTotal} style={{ background: '#C3C3C3'}} readOnly/> 
                <br />
                <label>Impuesto</label>
                <input type="text" id='impuesto' name='impuesto' value={impuesto} style={{ background: '#C3C3C3'}} readOnly/> 
                <br />
                <label>Total</label>
                <input type="text" id='total' name='total' value={total} style={{ background: '#C3C3C3'}} readOnly/> 
                <br />                

                <input type="submit" value="Grabar" />
            </form>
            <Link to="/">Volver</Link>
        </>
    )
}

module.exports = NuevaVentaPage;