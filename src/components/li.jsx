export function Lit(props) {
    const lista = props.lista
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
            <div className="buttonContainer">
                <button
                    className="botonto"
                    onClick={() => props.function(props.id)}
                    id={"boton" + props.id}>Agregar
                </button>
                <div className="close-button-cont" hidden={true} id={"close" + props.id} onClick={()=>props.function2(props.id,props.state)}></div>
            </div>
            <h1 className="h1" hidden={true} id={"h1" + props.id}>Cantidad</h1>
            <h1 className="h1" hidden={true} id={"h2" + props.id}>Insuficiente</h1>
        </>
    );
}