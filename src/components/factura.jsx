import {ProductoFactura} from "./productoFactura"
export function Factura({props, funcion}) {
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
                    <td className="listaFactura">{props.FechaPrestado} </td>
                </tr>
                <tr> 
                    <td className="listaFactura"> ID Prestamo </td>
                    <td className="listaFactura"> golas</td>
                </tr>
            </table>
            <table className="tableFactura2">
                <tr>
                    <td className="listaFactura">Cantidad</td>
                    <td className="listaFactura">Producto</td>
                </tr>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
                <ProductoFactura/>
            </table>
            <button onClick={funcion}>Cerrar</button>
        </div>
    </div>
}