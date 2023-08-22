export function Prestamo(props) {
    return <tr key={props.key}>
        <td className="lista2">{props.profesor}</td>
        <td className="lista2">{props.curso}</td>
        <td className="lista2">{props.hora}</td>
        <td className="lista2">{props.alumno}</td>
        <td className="lista2">{props.articulo}</td>
        <td className="lista2">{props.cantidad}</td>
        <td className="lista2">{props.prestador}</td>
    </tr>
}