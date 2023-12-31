
export function Articulo({ nombre, fecha, id, categoria, cantidad, disponible }) {
    return <tr key={id}>
        <td className='lista' key={id}>{nombre}</td>
        <td className='lista' key={id}>{fecha}</td>
        <td className='lista' key={id}>{id}</td>
        <td className='lista' key={id}>{categoria}</td>
        <td className='lista' key={id}>{cantidad}</td>
        <td className="lista">{disponible}</td>
    </tr>
}