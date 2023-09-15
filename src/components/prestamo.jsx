import { useState } from "react"
import { Factura } from "./factura"

export function Prestamo(props) {
    const [Activo, setActivo] = useState(props.Activo)
    const [factura, setFactura] = useState(false)
    const HandleClickFactura = () => {
        if (factura == false) {
            setFactura(true)
        }
    }
    const HandleClickDevuelto = () => {
        setActivo(false)
    }
    const cerrar = () =>{
        setFactura(false)
    }
    return <tr key={props.key}>
        <td className="lista2">{props.prestador}</td>
        <td className="lista2">{props.profesor}</td>
        <td className="lista2">{props.FechaPrestado}</td>
        <td className="lista2">{Activo.toString()}</td>
        {Activo && (
            <button onClick={() => HandleClickDevuelto()}>Devuelto</button>
        )}
        <button onClick={() => HandleClickFactura()}>Factura</button>
        {factura && (
            <Factura props={props} funcion={cerrar}/>
        )}
    </tr>
}