export function Lit(props) {
    const lista = props.lista
    return <>
        <select name="" id="" className="selec">
            {lista.map((elemento)=>
            <option key={elemento.props.id} value={elemento.props.nombre}>{elemento.props.nombre}</option>)}
        </select>
        <input type="number" name="" placeholder="Cantidad" id="" className="inputt"/>
    </>
}