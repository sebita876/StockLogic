import { useState } from "react"
import { Factura } from "./factura"
import axios from "axios"

export function Prestamo(props) {
    const [Activo, setActivo] = useState(props.Activo)
    const [factura, setFactura] = useState(false)
    const HandleClickFactura = () => {
        setFactura(true)
    }
    const funcion = () => {
        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();

        // Formatear la hora y los minutos como una cadena en el formato deseado
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        return formattedTime;
    }

    const HandleClickDevuelto = async () => {
        setActivo(funcion())
        await axios.put('/api/prestamos/[id]', {
            id: props.id,
            fecha: funcion()
        })
    }
    const cerrar = () => {
        setFactura(false)
    }
    return <tr key={props.key}>
        <td className="lista2">{props.prestador}</td>
        <td className="lista2">{props.profesor}</td>
        <td className="lista2">{props.fecha}</td>
        <td className="lista2">{props.hora}</td>
        <td className="lista2">{Activo}</td>
        {Activo && (
            <button onClick={() => HandleClickDevuelto()}>Devuelto</button>
        )}
        <button onClick={() => HandleClickFactura()}>Factura</button>
        {factura && (
            <Factura
                profesor={props.profesor}
                curso={props.curso}
                prestador={props.prestador}
                fecha={props.fecha}
                id={props.id}
                articulos={props.articulos}
                funcion={cerrar}
            />
        )}
    </tr>
}