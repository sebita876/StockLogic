'use client'
import { useRouter } from "next/navigation";
import { validarInicio } from "./register/validar";
import { useState } from "react";
import Conectar from "@/bd/conectarse";
export default function Base() {
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