import { useState } from "react"

export function Lit(props) {
    const lista = props.lista
    console.log(props.id)
    return (
        <>
                <div className="selecInputContainer">
                    <select
                        name=" "
                        id={props.id}
                        className="selec"
                    >
                        {lista.map((elemento) => (
                            <option key={elemento.props.id} value={elemento.props.nombre}>
                                {elemento.props.nombre}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name=""
                        id={"input" + props.id}
                        placeholder="Cantidad"
                        className="inputt"
                    />
                </div>
                <button className="botonto" onClick={()=>props.function(props.id)}>Agregar</button>

        </>
    );
}