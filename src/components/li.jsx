import { useState } from "react"

export function Lit(props) {
    const lista = props.lista
    console.log(props.id)
    return (
        <>
            <select name=" " id={props.id} className="selec" onChange={()=>props.function(props.id)} >
                {lista.map((elemento) =>
                    <option key={elemento.props.id} value={elemento.props.nombre}>{elemento.props.nombre}</option>)}
            </select>
            <input type="number" name="" placeholder="Cantidad" className="inputt" />
        </>
    );
}