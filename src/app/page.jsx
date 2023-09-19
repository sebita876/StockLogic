'use client'
import axios from "axios";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Base() {
    const [listaUsuarios, setListaUsuarios] = useState([])
    const validarInicio = async (user, pass, router) => {
        const array = listaUsuarios.map(elemento => elemento.dni == user && elemento.contraseña == pass);
        const validar = array.includes(true)
        if (validar == true) {
            document.getElementById("boton1").style.cursor = "not-allowed"
            document.getElementById("boton2").style.cursor = "not-allowed"
            document.getElementById("boton1").style.backgroundColor = "#005747"
            document.getElementById("boton2").style.backgroundColor = "#005747"
            document.getElementById("boton1").disabled = true
            document.getElementById("boton2").disabled = true
            setCookie(null, "isLogged", "true", {
                maxAge: 3600,
                path: "/",
            });
            router.push('/inventario')

            document.getElementById("H1").hidden = true
            document.getElementById("H2").hidden = false
        } else {
            document.getElementById("H1").hidden = false
        }
    }
    const traerUsuarios = async () => {
        const lista = await axios.get('/api/usuarios')
        console.log(lista)
        setListaUsuarios(lista.data.datos)
        console.log(listaUsuarios)
    }
    useEffect(() => {
            traerUsuarios()
    }, [])
    const router = useRouter()
    const handleClick = async () => {
        const user = document.getElementById("user").value
        const pass = document.getElementById("pass").value
        await validarInicio(user, pass, router)
    }
    const register = () => {
        router.push('/register')
    }
    return (

        <div>
            <div className="fondo" />
            <div className="login">
                <div className="container">
                    <div className="fotoStock" />
                    <h1 id="H1" className="text" hidden={true} >Usuario no encontrado</h1>
                    <h3 className="text" id="H2" hidden={true}>Cargando...</h3>
                    <input type="number" id="user" placeholder="DNI" className="inputTextLogin" />
                    <input type="password" id="pass" placeholder="Contraseña" className="inputTextLogin" />
                    <button className="botom" id="boton1" onClick={() => handleClick()}>Iniciar Sesión</button>
                    <button className="botom" id="boton2" onClick={() => register()}>Registrarse</button>
                </div>
            </div>
        </div>
    );
}