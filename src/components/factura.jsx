export function Factura( props ) {
    return <div className="fondoFactura">
        <div className="modalFactura">
            <table className="tableFactura1">
                <tr>
                    <td className="listaFactura"> Prestador </td>
                    <td className="listaFactura"> {props.prestador} </td>
                </tr>
                <tr>
                    <td className="listaFactura"> Profesor </td>
                    <td className="listaFactura"> {props.profesor} </td>
                </tr>
                <tr>
                    <td className="listaFactura"> Fecha </td>
                    <td className="listaFactura">{props.fecha} </td>
                </tr>
                <tr>
                    <td className="listaFactura"> ID Prestamo </td>
                    <td className="listaFactura"> {props.id}</td>
                </tr>
            </table>
            <table className="tableFactura2">
                <tr>
                    <td className="listaFactura">Producto</td>
                    <td className="listaFactura">Cantidad</td>
                </tr>
                {props.articulos.map((elemento) => <tr>
                    <td className="listaFactura">{elemento.articulo}</td>
                    <td className="listaFactura">{elemento.cantidad}</td>
                </tr>)}
            </table>
            <button onClick={props.funcion}>Cerrar</button>
        </div>
    </div>
}