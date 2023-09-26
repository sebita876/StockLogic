'use client'
import { useRouter } from "next/navigation";
import * as Validaciones from './validar'
export default function Login() {
    const router = useRouter()
    const guardarUsuario = () => {
        Validaciones.validarUsuario(router)
    }
    return (
        <div>
            <div className='fondo' />
            <div className='login'>
                <div className='container'>
                    <div className='fotoStock' />
                    <h1 id="H1hidden" className='text' hidden={true}>Usuario Invalido</h1>
                    <h1 id="H2hidden" className='text' hidden={true}>Guardado Correctamente</h1>
                    <input type="text" name="" id="Nombre" className="inputTextLogin" placeholder="Nombre Completo" />
                    <input type="number" placeholder="DNI" className='inputTextLogin' id='DNI' onInput={(e) => {
                        if (e.target.value.length > 8) {
                            e.target.value = e.target.value.slice(0, 8);
                        }
                    }} />
                    <input type="text" placeholder="Contraseña" className='inputTextLogin' id='contraseña' />
                    <input type="text" placeholder="Repetir Contaseña" className='inputTextLogin' id='RepContraseña' />
                    <input type="submit" value="Registrarse" className='botom' onClick={() => { guardarUsuario() }} />
                </div>
            </div>
        </div>
    );
}